<?php

namespace Tests\Unit\Events;

use App\Events\ResetEvent;
use App\Models\Room;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ResetEventTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_broadcasts_on_presence_channel(): void
    {
        $room = Room::factory()->create();
        $event = new ResetEvent($room);

        $channels = $event->broadcastOn();

        $this->assertCount(1, $channels);
        $this->assertInstanceOf(PresenceChannel::class, $channels[0]);
        $this->assertSame('presence-room.'.$room->slug, $channels[0]->name);
    }

    #[Test]
    public function it_has_the_correct_broadcast_name(): void
    {
        $room = Room::factory()->create();
        $event = new ResetEvent($room);

        $this->assertSame('reset', $event->broadcastAs());
    }

    #[Test]
    public function it_broadcasts_the_room_votes(): void
    {
        $room = Room::factory()->create();
        $room->update(['votes' => null]);

        $event = new ResetEvent($room);

        $this->assertSame(['room_votes' => null], $event->broadcastWith());
    }
}
