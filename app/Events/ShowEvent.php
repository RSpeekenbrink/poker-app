<?php

namespace App\Events;

use App\Models\Room;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ShowEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(protected Room $room, protected bool $show) {}

    public function broadcastOn(): array
    {
        return [
            new PresenceChannel('room.'.$this->room->slug),
        ];
    }

    public function broadcastAs(): string
    {
        return 'show';
    }

    public function broadcastWith(): array
    {
        return [
            'show' => $this->show,
        ];
    }
}
