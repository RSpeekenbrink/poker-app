<?php

namespace App\Contracts;

use App\Models\Participant;
use App\Models\Room;

interface ParticipantService
{
    /**
     * Create a new participant with given name and attach to given room.
     *
     * @param Room $room
     * @param string $name
     * @return Room
     */
    public function createParticipant(Room $room, string $name): Participant;

    /**
     * Get participant by UUID.
     *
     * @param string $uuid
     * @return ?Participant
     */
    public function getByUuid(string $uuid): ?Participant;
}
