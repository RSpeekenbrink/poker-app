<?php

namespace App\Broadcasting;

use App\Auth\StubUser;
use App\Models\Room;

class RoomChannel
{
    /**
     * Authenticate the user's access to the channel.
     */
    public function join(StubUser $user, string $roomId): array|bool
    {
        $room = Room::query()->where('slug', $roomId)->first();

        if (! $room || ! session()->has($room->id.'-name')) {
            return false;
        }

        return [
            'name' => $user->getName($roomId),
            'id' => $user->id,
        ];
    }
}
