<?php

namespace Tests\Unit\Events;

use App\Enums\Vote;
use App\Events\VotedEvent;
use App\Models\Room;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class VotedEventTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_broadcasts_on_presence_channel(): void
    {
        $room = Room::factory()->create();
        $event = new VotedEvent($room, 'user-1', Vote::FIVE);

        $channels = $event->broadcastOn();

        $this->assertCount(1, $channels);
        $this->assertInstanceOf(PresenceChannel::class, $channels[0]);
        $this->assertSame('presence-room.'.$room->slug, $channels[0]->name);
    }

    #[Test]
    public function it_has_the_correct_broadcast_name(): void
    {
        $room = Room::factory()->create();
        $event = new VotedEvent($room, 'user-1', Vote::FIVE);

        $this->assertSame('voted', $event->broadcastAs());
    }

    #[Test]
    public function it_broadcasts_the_correct_data(): void
    {
        $room = Room::factory()->create();
        $room->update(['votes' => ['user-1' => '5']]);

        $event = new VotedEvent($room, 'user-1', Vote::FIVE);
        $data = $event->broadcastWith();

        $this->assertSame('user-1', $data['user_id']);
        $this->assertSame('5', $data['vote']);
        $this->assertSame(['user-1' => '5'], $data['room_votes']);
    }
}
