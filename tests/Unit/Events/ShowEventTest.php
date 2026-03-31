<?php

namespace Tests\Unit\Events;

use App\Events\ShowEvent;
use App\Models\Room;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ShowEventTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_broadcasts_on_presence_channel(): void
    {
        $room = Room::factory()->create();
        $event = new ShowEvent($room, true);

        $channels = $event->broadcastOn();

        $this->assertCount(1, $channels);
        $this->assertInstanceOf(PresenceChannel::class, $channels[0]);
        $this->assertSame('presence-room.'.$room->slug, $channels[0]->name);
    }

    #[Test]
    public function it_has_the_correct_broadcast_name(): void
    {
        $room = Room::factory()->create();
        $event = new ShowEvent($room, true);

        $this->assertSame('show', $event->broadcastAs());
    }

    #[Test]
    public function it_broadcasts_the_show_value(): void
    {
        $room = Room::factory()->create();

        $this->assertSame(['show' => true], (new ShowEvent($room, true))->broadcastWith());
        $this->assertSame(['show' => false], (new ShowEvent($room, false))->broadcastWith());
    }
}
