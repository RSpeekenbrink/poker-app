<?php

namespace App\Services;

use App\Contracts\RoomService as RoomServiceContract;
use App\Models\Room;
use Illuminate\Support\Str;

class RoomService implements RoomServiceContract
{
    /**
     * Voting options, the fibonacci sequence numbers that can be voted for.
     */
    const VOTING_OPTIONS = [
        '1',
        '2',
        '3',
        '5',
        '8',
        '13',
        '21',
    ];

    /**
     * @inheritDoc
     */
    public function getVotingOptions(): array
    {
        return self::VOTING_OPTIONS;
    }

    /**
     * @inheritDoc
     */
    public function createRoom(string $roomName): Room
    {
        return Room::create([
            'uuid' => Str::uuid(),
            'name' => $roomName,
        ]);
    }

    /**
     * @inheritDoc
     */
    public function getByUuid(string $uuid): ?Room
    {
        return Room::where('uuid', $uuid)->first();
    }
}
