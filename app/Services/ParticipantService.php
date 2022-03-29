<?php

namespace App\Services;

use App\Contracts\ParticipantService as ParticpantServiceContract;
use App\Models\Participant;
use App\Models\Room;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use phpDocumentor\Reflection\Types\Boolean;

class ParticipantService implements ParticpantServiceContract
{
    const PARTICIPANT_SESSION_KEY = 'participant_uuid';

    /**
     * @inheritDoc
     */
    public function createParticipant(Room $room, string $name): Participant
    {
        return Participant::create([
            'uuid' => Str::uuid(),
            'name' => $name,
            'room_id' => $room->id,
        ]);
    }

    /**
     * @inheritDoc
     */
    public function getByUuid(string $uuid): ?Participant
    {
        return Participant::where('uuid', $uuid)->first();
    }

    /**
     * @inheritDoc
     */
    public function setSessionParticipant(Participant $participant): self
    {
        Session::put(self::PARTICIPANT_SESSION_KEY, $participant->uuid);

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function hasInSession(): bool
    {
        return Session::has(self::PARTICIPANT_SESSION_KEY)
            && Participant::where('uuid', Session::get(self::PARTICIPANT_SESSION_KEY));
    }

    /**
     * @inheritDoc
     */
    public function getFromSession(): ?Participant
    {
        if ($this->hasInSession()) {
            return $this->getByUuid(Session::get(self::PARTICIPANT_SESSION_KEY));
        }

        return null;
    }

    /**
     * @inheritDoc
     */
    public function setOwnedRoomFor(Participant $participant, Room $room): ParticpantServiceContract
    {
        $participant->ownedRoom()->save($room);

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function isOwner(Room $room, Participant $participant): bool
    {
        if ($participant->ownedRoom()->exists()) {
            $participant->load('ownedRoom');

            return $room->uuid == $participant->ownedRoom->uuid;
        }

        return false;
    }
}
