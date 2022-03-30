<?php

namespace App\Services;

use App\Contracts\ParticipantService as ParticpantServiceContract;
use App\Models\Participant;
use App\Models\Room;
use Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use phpDocumentor\Reflection\Types\Boolean;

class ParticipantService implements ParticpantServiceContract
{
    const PARTICIPANT_GUARD = 'web';

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
    public function authenticateAs(Participant $participant): self
    {
        Auth::guard(self::PARTICIPANT_GUARD)->login($participant, );

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function isLoggedIn(): bool
    {
        return Auth::guard(self::PARTICIPANT_GUARD)->check();
    }

    /**
     * @inheritDoc
     */
    public function getFromSession(): ?Participant
    {
        if ($this->isLoggedIn()) {
            return Auth::guard(self::PARTICIPANT_GUARD)->user();
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
