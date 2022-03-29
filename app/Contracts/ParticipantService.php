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

    /**
     * Save participant to current session (log-in ish)
     *
     * @param Participant $participant
     * @return $this
     */
    public function setSessionParticipant(Participant $participant): self;

    /**
     * Return if the session has a participant uuid saved and if this one is valid.
     *
     * @return bool
     */
    public function hasInSession(): bool;

    /**
     * Get Participant from session when exists.
     *
     * @return Participant|null
     */
    public function getFromSession(): ?Participant;

    /**
     * Set owned room to given room for participant.
     *
     * @param Participant $participant
     * @param Room $room
     * @return $this
     */
    public function setOwnedRoomFor(Participant $participant, Room $room): self;

    /**
     * Check if given participant is owner of given room.
     *
     * @param Room $room
     * @param Participant $participant
     * @return bool
     */
    public function isOwner(Room $room, Participant $participant): bool;
}
