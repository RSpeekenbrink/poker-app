<?php

namespace Tests\Feature\Broadcasting;

use App\Auth\StubUser;
use App\Broadcasting\RoomChannel;
use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class RoomChannelTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function join_returns_user_data_when_session_has_room_name(): void
    {
        $room = Room::factory()->create();
        $user = new StubUser(['id' => 'user-1']);

        session([$room->id.'-name' => 'Alice']);

        $channel = new RoomChannel();
        $result = $channel->join($user, $room->slug);

        $this->assertIsArray($result);
        $this->assertSame('Alice', $result['name']);
        $this->assertSame('user-1', $result['id']);
    }

    #[Test]
    public function join_returns_false_when_no_session_name(): void
    {
        $room = Room::factory()->create();
        $user = new StubUser(['id' => 'user-1']);

        $channel = new RoomChannel();
        $result = $channel->join($user, $room->slug);

        $this->assertFalse($result);
    }

    #[Test]
    public function join_returns_false_for_nonexistent_room(): void
    {
        $user = new StubUser(['id' => 'user-1']);

        $channel = new RoomChannel();
        $result = $channel->join($user, 'nonexistent-slug');

        $this->assertFalse($result);
    }
}
