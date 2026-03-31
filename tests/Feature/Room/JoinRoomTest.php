<?php

namespace Tests\Feature\Room;

use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class JoinRoomTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function join_form_renders_for_unauthenticated_user(): void
    {
        $room = Room::factory()->create();

        $response = $this->get(route('room.join', $room->slug));

        $response->assertOk();
    }

    #[Test]
    public function join_form_redirects_to_room_if_already_joined(): void
    {
        $room = Room::factory()->create();

        $this->post(route('room.join.request', $room->slug), [
            'name' => 'Alice',
        ]);

        $response = $this->get(route('room.join', $room->slug));

        $response->assertRedirect(route('room.show', $room->slug));
    }

    #[Test]
    public function join_authenticates_and_redirects_to_room(): void
    {
        $room = Room::factory()->create();

        $response = $this->post(route('room.join.request', $room->slug), [
            'name' => 'Bob',
        ]);

        $response->assertRedirect(route('room.show', $room->slug));
        $this->assertAuthenticated();
        $this->assertSame('Bob', session($room->id.'-name'));
    }

    #[Test]
    public function join_requires_name(): void
    {
        $room = Room::factory()->create();

        $response = $this->post(route('room.join.request', $room->slug), []);

        $response->assertSessionHasErrors('name');
    }

    #[Test]
    public function join_nonexistent_room_redirects_with_error(): void
    {
        $response = $this->get('/join/non-existent-slug');

        $response->assertRedirect(route('index'));
        $response->assertSessionHas('error');
    }
}
