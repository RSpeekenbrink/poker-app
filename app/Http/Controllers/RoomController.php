<?php

namespace App\Http\Controllers;

use App\Contracts\ParticipantService;
use App\Contracts\RoomService;
use App\Http\Requests\CreateRoomRequest;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    /** @var ParticipantService */
    protected ParticipantService $participantService;

    /** @var RoomService */
    protected RoomService $roomService;

    /**
     * @param RoomService $roomService
     */
    public function __construct(ParticipantService $participantService, RoomService $roomService)
    {
        $this->participantService = $participantService;
        $this->roomService = $roomService;
    }

    /**
     * Load application's homepage.
     *
     * @return RedirectResponse
     */
    public function create(CreateRoomRequest $request): RedirectResponse
    {
        $room = $this->roomService->createRoom($request->room_name);
        $participant = $this->participantService->createParticipant($room, $request->name);

        $this->participantService->setOwnedRoomFor($participant, $room);

        $this->participantService->setSessionParticipant($participant);

        return Redirect::route('room.show', $room->uuid);
    }

    /**
     * Show room SPA page.
     *
     * @param Room $room
     * @return Response
     */
    public function show(Room $room): Response
    {
        $participant = $this->participantService->getFromSession();

        if (!$this->roomService->hasParticipant($room, $participant)) {
            abort(401); //TODO: Send to login/create new participant
        }

        return Inertia::render('Room/Index', [
            'room' => [
                'id' => $room->uuid,
                'name' => $room->name,
                'isOwner' => $this->participantService->isOwner($room, $participant),
            ],
            'participant' => [
                'id' => $participant->uuid,
                'name' => $participant->name,
            ]
        ]);
    }
}
