<?php

namespace App\Auth;

use App\Models\Room;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Session;

/**
 * @property string $id
 */
class StubUser extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, Notifiable;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
    ];

    public function getName(?string $roomId = null): string
    {
        $room = Request::route('room');

        if (! $room) {
            if (! $roomId || ! $room = Room::query()->where('slug', $roomId)->first()) {
                return '';
            }
        }

        return Session::get($room->id.'-name', '');
    }
}
