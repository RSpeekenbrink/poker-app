<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoomRequest;
use App\Http\Requests\JoinRoomRequest;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Rooms/Index');
    }

    public function store(CreateRoomRequest $request): RedirectResponse
    {
        $room = Room::query()->create([
            'name' => $request->room_name
        ]);

        Session::put($room->id.'.name', $request->name);

        return Redirect::route('room.show', $room->slug);
    }

    public function show(Room $room): RedirectResponse|Response
    {
        if (! Session::has($room->id.'.name')) {
            return Redirect::route('room.join', $room->slug);
        }

        return Inertia::render('Rooms/Show', [
            'room' => ['slug' => $room->slug, 'name' => $room->name],
            'user' => ['name' => Session::get($room->id.'.name')],
        ]);
    }

    public function joinForm(Room $room): RedirectResponse|Response
    {
        if (Session::has($room->id.'.name')) {
            return Redirect::route('room.show', $room->slug);
        }

        return Inertia::render('Rooms/Join', [
            'room' => ['slug' => $room->slug, 'name' => $room->name],
        ]);
    }

    public function join(Room $room, JoinRoomRequest $request): RedirectResponse
    {
        Session::put($room->id.'.name', $request->name);

        return Redirect::route('room.show', $room->slug);
    }
}
