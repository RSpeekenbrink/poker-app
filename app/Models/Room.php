<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * Room Model.
 *
 * Database Attributes;
 *
 * @property int $id
 * @property string $slug
 * @property string $name
 * @property boolean $show
 * @property array<string, string> $votes
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * Methods:
 *
 * @method static \Database\Factories\RoomFactory factory(...$parameters)
 */
class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'votes',
        'show',
    ];

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->slug = Str::uuid();
        });
    }

    protected function casts(): array
    {
        return [
            'votes' => 'array',
        ];
    }
}
