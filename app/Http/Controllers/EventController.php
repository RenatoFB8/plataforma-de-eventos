<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Models\Event;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

        return Inertia::render('Events/Show', [
            'event' => $event,
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }
}
