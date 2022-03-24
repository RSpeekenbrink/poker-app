<?php

namespace App\Http\Controllers;

use App\Contracts\ParticipantService;
use App\Contracts\RoomService;
use App\Http\Requests\CreateRoomRequest;
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
     * @return Response
     */
    public function create(CreateRoomRequest $request): Response
    {
        $room = $this->roomService->createRoom($request->room_name);
        $participant = $this->participantService->createParticipant($room, $request->name);

        return Inertia::render('Index', [
            'room' => $room->uuid,
            'participant' => $participant->uuid,
        ]);
    }
}
