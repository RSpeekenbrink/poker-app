<?php

namespace App\Broadcasting;

use App\Contracts\ParticipantService;
use App\Contracts\RoomService;
use App\Models\Participant;

class RoomChannel
{
    /** @var ParticipantService */
    protected ParticipantService $participantService;

    /** @var RoomService */
    protected RoomService $roomService;

    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct(ParticipantService $participantService, RoomService $roomService)
    {
        $this->participantService = $participantService;
        $this->roomService = $roomService;
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @return array|bool
     */
    public function join(Participant $participant, string $roomId): array|bool
    {
        $room = $this->roomService->getByUuid($roomId);

        if (!$room) {
            return false;
        }

        if ($this->roomService->hasParticipant($room, $participant)) {
            return [
                'uuid' => $participant->uuid,
                'name' => $participant->name,
            ];
        }

        return false;
    }
}
