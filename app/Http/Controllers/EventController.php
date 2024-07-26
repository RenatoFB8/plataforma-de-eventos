<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use App\Notifications\EventUpdatedNotification;


class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::with('location')->paginate(4);

        return Inertia::render('Welcome', [
            'events' => $events,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Events/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $mainImagePath = $request->file('main_image')->store('images', 'public');

        $locationImagesPaths = [];

        if ($request->has('location_images')) {
            foreach ($request->file('location_images') as $image) {
                $locationImagesPaths[] = $image->store('images', 'public');
            }
        }

        $location = Location::create([
            'street' => $request->street,
            'street_number' => $request->street_number,
            'city' => $request->city,
            'neighborhood' => $request->neighborhood,
            'state' => $request->state,
            'cep' => $request->cep,
        ]);

        $event = Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'max_participants' => $request->max_participants,
            'entry_price' => $request->entry_price,
            'main_image' => $mainImagePath,
            'location_images' => $locationImagesPaths,
            'location_id' => $location->id,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('event.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        $event->load('location');

        $event->load([
            'users' => function ($query) {
                $query->select('name');
            }
        ]);

        $userNames = $event->users->pluck('name');

        $event->participants = $userNames;

        unset($event->users);

        return Inertia::render('Events/Show', [
            'event' => $event,
        ]);
    }
    public function edit(Event $event)
    {
        Gate::authorize('admin-event', $event);

        $event->load('location');

        return Inertia::render('Events/Edit', [
            'event' => $event,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        Gate::authorize('admin-event', $event);

        $mainImagePath = $event->main_image;

        if ($request->hasFile('main_image')) {
            $mainImagePath = $request->file('main_image')->store('images', 'public');
        }

        $locationImagesPaths = $event->location_images;

        if ($request->has('location_images')) {
            $locationImagesPaths = [];
            foreach ($request->location_images as $image) {
                // Verifica se o item é uma string de path ou um arquivo de imagem
                if (is_string($image)) {
                    // Adiciona o path diretamente à array
                    $locationImagesPaths[] = $image;
                } elseif ($image instanceof \Illuminate\Http\UploadedFile) {
                    // Armazena o arquivo de imagem e adiciona o path resultante à array
                    $locationImagesPaths[] = $image->store('images', 'public');
                }
            }
        }

        $event->location->update([
            'street' => $request->street,
            'street_number' => $request->street_number,
            'city' => $request->city,
            'neighborhood' => $request->neighborhood,
            'state' => $request->state,
            'cep' => $request->cep,
        ]);

        $event->update([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'max_participants' => $request->max_participants,
            'entry_price' => $request->entry_price,
            'main_image' => $mainImagePath,
            'location_images' => $locationImagesPaths,
        ]);

        $participants = $event->users;
        foreach ($participants as $participant) {
            $participant->notify(new EventUpdatedNotification($event));
        }

        return redirect()->route('event.index');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        // Verifica se o usuário tem permissão para deletar o evento
        Gate::authorize('admin-event', $event);
        // Verifica se o evento tem participantes
        if ($event->users_count > 0) {
            throw ValidationException::withMessages([
                'users_count' => 'Não foi possivel deletar o evento, já possui participantes.',
            ]);
        }

        // Deleta o evento
        $event->delete();

        return redirect()->route('event.index')->with('success', 'Evento deletado com sucesso.');
    }

    public function userEvents(Request $request)
    {
        // Get the authenticated user
        $user = auth()->user();

        // Get the page numbers for created and participating events
        $createdPage = $request->input('created_page', 1);
        $participatingPage = $request->input('participating_page', 1);

        // Log the page numbers for debugging
        \Log::info('Created Page: ' . $createdPage);
        \Log::info('Participating Page: ' . $participatingPage);

        // Get events created by the user
        $createdEvents = Event::with('location')
            ->where('user_id', $user->id)
            ->paginate(3, ['*'], 'created_page', $createdPage);

        // Get events the user is participating in
        $participatingEvents = $user->events()->with('location')->paginate(4, ['*'], 'participating_page', $participatingPage);

        return Inertia::render('Events/UserEvents', [
            'createdEvents' => $createdEvents,
            'participatingEvents' => $participatingEvents,
        ]);
    }



}
