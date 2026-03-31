<?php

namespace Tests\Feature\Room;

use App\Enums\Vote;
use App\Events\VotedEvent;
use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class VoteTest extends TestCase
{
    use RefreshDatabase;

    private function joinRoom(Room $room, string $name = 'Alice'): void
    {
        $this->post(route('room.join.request', $room->slug), [
            'name' => $name,
        ]);
    }

    #[Test]
    public function vote_stores_vote_in_database(): void
    {
        Event::fake([VotedEvent::class]);
        $room = Room::factory()->create();
        $this->joinRoom($room);

        $response = $this->post(route('room.vote', $room->slug), [
            'vote' => '5',
        ]);

        $response->assertNoContent();
        $room->refresh();
        $this->assertArrayHasKey(auth()->id(), $room->votes);
        $this->assertSame('5', $room->votes[auth()->id()]);
    }

    #[Test]
    public function vote_dispatches_voted_event(): void
    {
        Event::fake([VotedEvent::class]);
        $room = Room::factory()->create();
        $this->joinRoom($room);

        $this->post(route('room.vote', $room->slug), [
            'vote' => '8',
        ]);

        Event::assertDispatched(VotedEvent::class);
    }

    #[Test]
    public function vote_requires_valid_vote_value(): void
    {
        $room = Room::factory()->create();
        $this->joinRoom($room);

        $response = $this->post(route('room.vote', $room->slug), [
            'vote' => 'invalid',
        ]);

        $response->assertSessionHasErrors('vote');
    }

    #[Test]
    public function vote_requires_vote_field(): void
    {
        $room = Room::factory()->create();
        $this->joinRoom($room);

        $response = $this->post(route('room.vote', $room->slug), []);

        $response->assertSessionHasErrors('vote');
    }

    #[Test]
    public function vote_forbidden_without_session_name(): void
    {
        $room = Room::factory()->create();

        // Authenticate via a different room — don't join $room
        $this->post(route('room.create'), [
            'room_name' => 'Other',
            'name' => 'Alice',
        ]);

        $response = $this->post(route('room.vote', $room->slug), [
            'vote' => '5',
        ]);

        $response->assertForbidden();
    }

    #[Test]
    public function vote_accepts_all_valid_vote_values(): void
    {
        Event::fake([VotedEvent::class]);

        foreach (Vote::cases() as $vote) {
            $room = Room::factory()->create();
            $this->joinRoom($room);

            $response = $this->post(route('room.vote', $room->slug), [
                'vote' => $vote->value,
            ]);

            $response->assertNoContent();
        }
    }

    #[Test]
    public function vote_updates_existing_vote(): void
    {
        Event::fake([VotedEvent::class]);
        $room = Room::factory()->create();
        $this->joinRoom($room);

        $this->post(route('room.vote', $room->slug), ['vote' => '5']);
        $this->post(route('room.vote', $room->slug), ['vote' => '8']);

        $room->refresh();
        $this->assertSame('8', $room->votes[auth()->id()]);
    }
}
