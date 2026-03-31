<?php

namespace App\Events;

use App\Models\Room;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ResetEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(protected Room $room) {}

    public function broadcastOn(): array
    {
        return [
            new PresenceChannel('room.'.$this->room->slug),
        ];
    }

    public function broadcastAs(): string
    {
        return 'reset';
    }

    public function broadcastWith(): array
    {
        return [
            'room_votes' => $this->room->votes,
        ];
    }
}
