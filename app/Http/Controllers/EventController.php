<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::paginate(4);

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
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'max_participants' => 'required|integer',
            'entry_price' => 'required|numeric',
            'main_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'location_images' => 'array|max:6',
            'location_images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $mainImagePath = $request->file('main_image')->store('images', 'public');
        
        $locationImagesPaths = [];

        if ($request->has('location_images')) {
            foreach ($request->file('location_images') as $image) {
                $locationImagesPaths[] = $image->store('images', 'public');
            }
        }

        $event = Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'max_participants' => $request->max_participants,
            'entry_price' => $request->entry_price,
            'main_image' => $mainImagePath,
            'location_images' => $locationImagesPaths,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('event.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        //
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
