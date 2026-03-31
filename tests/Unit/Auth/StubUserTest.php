<?php

namespace Tests\Unit\Auth;

use App\Auth\StubUser;
use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Session;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class StubUserTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_can_be_created_with_id(): void
    {
        $user = new StubUser(['id' => 'test-id']);

        $this->assertSame('test-id', $user->id);
    }

    #[Test]
    public function get_name_returns_empty_string_when_no_room_in_route_and_no_room_id(): void
    {
        $user = new StubUser(['id' => 'test-id']);

        $this->assertSame('', $user->getName());
    }

    #[Test]
    public function get_name_returns_empty_string_when_room_id_not_found(): void
    {
        $user = new StubUser(['id' => 'test-id']);

        $this->assertSame('', $user->getName('non-existent-slug'));
    }

    #[Test]
    public function get_name_returns_name_from_session_with_room_id(): void
    {
        $room = Room::factory()->create();
        Session::put($room->id.'-name', 'John');

        $user = new StubUser(['id' => 'test-id']);

        $this->assertSame('John', $user->getName($room->slug));
    }

    #[Test]
    public function get_name_returns_empty_string_when_no_session_name(): void
    {
        $room = Room::factory()->create();

        $user = new StubUser(['id' => 'test-id']);

        $this->assertSame('', $user->getName($room->slug));
    }
}
