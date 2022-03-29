<?php

namespace App\Contracts;

use App\Models\Participant;
use App\Models\Room;

interface RoomService
{
    /**
     * Get all voting options available.
     *
     * @return string[]
     */
    public function getVotingOptions(): array;

    /**
     * Create a new room with given name.
     *
     * @param string $roomName
     * @return Room
     */
    public function createRoom(string $roomName): Room;

    /**
     * Get Room by UUID.
     *
     * @param string $uuid
     * @return ?Room
     */
    public function getByUuid(string $uuid): ?Room;

    /**
     * Returns if given participant is participating given room.
     *
     * @param Room $room
     * @param Participant $particpant
     * @return bool
     */
    public function hasParticipant(Room $room, Participant $particpant): bool;
}
