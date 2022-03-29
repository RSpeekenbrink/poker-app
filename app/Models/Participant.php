<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property integer $id
 * @property string $uuid
 * @property string $name
 * @property integer $room_id
 */
class Participant extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'participants';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'uuid',
        'name',
        'room_id',
    ];

    /**
     * Get the room the Participant belongs to.
     *
     * @return BelongsTo
     */
    public function room():BelongsTo
    {
        return $this->belongsTo(Room::class, 'room_id', 'id');
    }

    /**
     * Get room the Participant owns.
     *
     * @return HasOne
     */
    public function ownedRoom():HasOne
    {
        return $this->hasOne(Room::class, 'owner_id', 'id');
    }
}
