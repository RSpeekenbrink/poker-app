<?php

namespace Tests\Feature\Room;

use App\Events\ShowEvent;
use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ShowVotesTest extends TestCase
{
    use RefreshDatabase;

    private function joinRoom(Room $room, string $name = 'Alice'): void
    {
        $this->post(route('room.join.request', $room->slug), [
            'name' => $name,
        ]);
    }

    #[Test]
    public function showVotes_updates_room(): void
    {
        Event::fake([ShowEvent::class]);
        $room = Room::factory()->create();
        $this->joinRoom($room);

        $response = $this->post(route('room.showVotes', $room->slug), [
            'show' => true,
        ]);

        $response->assertNoContent();
        $room->refresh();
        $this->assertTrue((bool) $room->show);
    }

    #[Test]
    public function showVotes_dispatches_show_event(): void
    {
        Event::fake([ShowEvent::class]);
        $room = Room::factory()->create();
        $this->joinRoom($room);

        $this->post(route('room.showVotes', $room->slug), [
            'show' => true,
        ]);

        Event::assertDispatched(ShowEvent::class);
    }

    #[Test]
    public function showVotes_can_hide_votes(): void
    {
        Event::fake([ShowEvent::class]);
        $room = Room::factory()->create();
        $room->update(['show' => true]);
        $this->joinRoom($room);

        $this->post(route('room.showVotes', $room->slug), [
            'show' => false,
        ]);

        $room->refresh();
        $this->assertFalse((bool) $room->show);
    }

    #[Test]
    public function showVotes_requires_show_field(): void
    {
        $room = Room::factory()->create();
        $this->joinRoom($room);

        $response = $this->post(route('room.showVotes', $room->slug), []);

        $response->assertSessionHasErrors('show');
    }

    #[Test]
    public function showVotes_requires_boolean(): void
    {
        $room = Room::factory()->create();
        $this->joinRoom($room);

        $response = $this->post(route('room.showVotes', $room->slug), [
            'show' => 'not-a-boolean',
        ]);

        $response->assertSessionHasErrors('show');
    }

    #[Test]
    public function showVotes_forbidden_without_session_name(): void
    {
        $room = Room::factory()->create();

        $this->post(route('room.create'), [
            'room_name' => 'Other',
            'name' => 'Alice',
        ]);

        $response = $this->post(route('room.showVotes', $room->slug), [
            'show' => true,
        ]);

        $response->assertForbidden();
    }
}
