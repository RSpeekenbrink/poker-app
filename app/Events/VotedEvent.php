<?php

namespace App\Events;

use App\Enums\Vote;
use App\Models\Room;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class VotedEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(protected Room $room, protected string $id, protected Vote $vote) {}

    public function broadcastOn(): array
    {
        return [
            new PresenceChannel('room.'.$this->room->slug),
        ];
    }

    public function broadcastAs(): string
    {
        return 'voted';
    }

    public function broadcastWith(): array
    {
        return [
            'user_id' => $this->id,
            'vote' => $this->vote->value,
            'room_votes' => $this->room->votes,
        ];
    }
}
