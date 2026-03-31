<?php

namespace Tests\Unit\Models;

use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class RoomTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_generates_a_uuid_slug_on_creation(): void
    {
        $room = Room::factory()->create();

        $this->assertNotNull($room->slug);
        $this->assertMatchesRegularExpression(
            '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/',
            $room->slug,
        );
    }

    #[Test]
    public function it_generates_a_unique_slug_per_room(): void
    {
        $room1 = Room::factory()->create();
        $room2 = Room::factory()->create();

        $this->assertNotSame($room1->slug, $room2->slug);
    }

    #[Test]
    public function it_casts_votes_as_array(): void
    {
        $room = Room::factory()->create();
        $votes = ['user-1' => '5', 'user-2' => '8'];

        $room->update(['votes' => $votes]);
        $room->refresh();

        $this->assertIsArray($room->votes);
        $this->assertSame($votes, $room->votes);
    }
}
