<?php

namespace App\Http\Controllers;
use App\Models\Room;
use Inertia\Inertia;
use App\Models\Group;


use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::get();
        $groups = Group::with('parent')->get();
        return Inertia::render('admin/SchoolsResources/Rooms', compact('rooms'));

    }
    // Show add room form
    public function create()
    {
        return Inertia::render('Forms/AddForms/AddRoom');
    }

    // Store new room
    public function store(Request $request)
    {
        $validated = $request->validate([
            'roomName' => 'required|string|max:255|regex:/^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/'
        ]);

        Room::create([
            'room_name' => $validated['roomName'],
            'school_id' => auth()->school_id ?? 1, // Adjust as needed
        ]);

        return redirect()
            ->route('schoolResources.rooms')
            ->with('toastMessage', 'Room added successfully');
    }

    // Show edit form
    public function edit($id)
    {
        $room = Room::findOrFail($id);

        return Inertia::render('Forms/EditForms/EditRoom', [
            'room' => $room
        ]);
    }  

    // Update room
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'roomName' => 'required|string|max:255|regex:/^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/'
        ]);

        $room = Room::findOrFail($id);
        $room->update([
            'room_name' => $validated['roomName']
        ]);

        return redirect()
            ->route('schoolResources.rooms');
    }

    // Delete room
    public function destroy($id)
    {
        

            try {
                Room::destroy($id);
                return redirect()->route('schoolResources.rooms')->with('toastMessage', 'Salle Bien supprimer!');
            } catch (\Exception $e) {
                return redirect()->route('schoolResources.rooms')->with('toastMessage', 'Salle n est pas supprimmer.');
            }
    }

}
