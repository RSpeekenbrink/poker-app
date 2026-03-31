<?php

namespace Tests\Feature\Room;

use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ShowRoomTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function show_redirects_to_join_when_not_authenticated(): void
    {
        $room = Room::factory()->create();

        $response = $this->get(route('room.show', $room->slug));

        $response->assertRedirect(route('room.join', $room->slug));
    }

    #[Test]
    public function show_redirects_to_join_when_no_session_name(): void
    {
        $room = Room::factory()->create();

        // Authenticate via a different room — don't join $room
        $this->post(route('room.create'), [
            'room_name' => 'Other Room',
            'name' => 'Alice',
        ]);

        $response = $this->get(route('room.show', $room->slug));

        $response->assertRedirect(route('room.join', $room->slug));
    }

    #[Test]
    public function show_renders_room_for_joined_user(): void
    {
        $room = Room::factory()->create();

        $this->post(route('room.join.request', $room->slug), [
            'name' => 'Alice',
        ]);

        $response = $this->get(route('room.show', $room->slug));

        $response->assertOk();
    }

    #[Test]
    public function show_nonexistent_room_redirects_with_error(): void
    {
        $response = $this->get('/non-existent-slug');

        $response->assertRedirect(route('index'));
        $response->assertSessionHas('error');
    }
}
