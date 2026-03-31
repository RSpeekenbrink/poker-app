<?php

namespace Tests\Feature\Room;

use App\Events\ResetEvent;
use App\Events\VotedEvent;
use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ResetRoomTest extends TestCase
{
    use RefreshDatabase;

    private function joinRoom(Room $room, string $name = 'Alice'): void
    {
        $this->post(route('room.join.request', $room->slug), [
            'name' => $name,
        ]);
    }

    #[Test]
    public function reset_clears_votes_and_show_flag(): void
    {
        Event::fake([VotedEvent::class, ResetEvent::class]);
        $room = Room::factory()->create();
        $this->joinRoom($room);

        $this->post(route('room.vote', $room->slug), ['vote' => '5']);
        $room->refresh();
        $this->assertNotNull($room->votes);

        $response = $this->post(route('room.reset', $room->slug));

        $response->assertNoContent();
        $room->refresh();
        $this->assertNull($room->votes);
        $this->assertFalse((bool) $room->show);
    }

    #[Test]
    public function reset_dispatches_reset_event(): void
    {
        Event::fake([ResetEvent::class]);
        $room = Room::factory()->create();
        $this->joinRoom($room);

        $this->post(route('room.reset', $room->slug));

        Event::assertDispatched(ResetEvent::class);
    }

    #[Test]
    public function reset_forbidden_without_session_name(): void
    {
        $room = Room::factory()->create();

        $this->post(route('room.create'), [
            'room_name' => 'Other',
            'name' => 'Alice',
        ]);

        $response = $this->post(route('room.reset', $room->slug));

        $response->assertForbidden();
    }
}
