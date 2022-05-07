<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property integer $id
 * @property string $uuid
 * @property string $name
 * @property integer $voting_duration
 * @property Carbon $voting_started_at
 * @property array $votes
 * @property integer $owner_id
 * @property Participant $owner
 */
class Room extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'rooms';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'uuid',
        'name',
        'voting_duration',
        'voting_started_at',
        'votes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'voting_started_at' => 'datetime',
        'votes' => 'array',
    ];

    /**
     * Get all participants belonging to a room.
     *
     * @return HasMany
     */
    public function participants(): HasMany
    {
        return $this->hasMany(Participant::class, 'room_id');
    }

    /**
     * Get the participant owning the room.
     *
     * @return BelongsTo
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(Participant::class, 'owner_id', 'id');
    }
}
