<?php

namespace App\Services;

use App\Contracts\ParticipantService as ParticpantServiceContract;
use App\Models\Participant;
use App\Models\Room;
use Illuminate\Support\Str;

class ParticipantService implements ParticpantServiceContract
{
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
}
