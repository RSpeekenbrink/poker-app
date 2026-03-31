<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $slug
 * @property string $name
 * @property bool $show
 * @property array<string, string> $votes
 * @property Carbon $created_at
 * @property Carbon|null $updated_at
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
