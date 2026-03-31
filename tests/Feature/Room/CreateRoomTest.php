<?php

namespace Tests\Feature\Room;

use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CreateRoomTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function index_page_returns_ok(): void
    {
        $response = $this->get(route('index'));

        $response->assertOk();
    }

    #[Test]
    public function store_creates_room_and_redirects(): void
    {
        $response = $this->post(route('room.create'), [
            'room_name' => 'Sprint Planning',
            'name' => 'Alice',
        ]);

        $this->assertDatabaseHas('rooms', ['name' => 'Sprint Planning']);

        $room = Room::where('name', 'Sprint Planning')->first();
        $response->assertRedirect(route('room.show', $room->slug));
    }

    #[Test]
    public function store_authenticates_user(): void
    {
        $this->post(route('room.create'), [
            'room_name' => 'Sprint Planning',
            'name' => 'Alice',
        ]);

        $this->assertAuthenticated();
    }

    #[Test]
    public function store_saves_user_name_to_session(): void
    {
        $this->post(route('room.create'), [
            'room_name' => 'Sprint Planning',
            'name' => 'Alice',
        ]);

        $room = Room::where('name', 'Sprint Planning')->first();

        $this->assertSame('Alice', session($room->id.'-name'));
    }

    #[Test]
    public function store_requires_room_name(): void
    {
        $response = $this->post(route('room.create'), [
            'name' => 'Alice',
        ]);

        $response->assertSessionHasErrors('room_name');
        $this->assertDatabaseCount('rooms', 0);
    }

    #[Test]
    public function store_requires_user_name(): void
    {
        $response = $this->post(route('room.create'), [
            'room_name' => 'Sprint Planning',
        ]);

        $response->assertSessionHasErrors('name');
        $this->assertDatabaseCount('rooms', 0);
    }
}
