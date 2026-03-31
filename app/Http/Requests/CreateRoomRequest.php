<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $name
 * @property string $room_name
 */
class CreateRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'room_name' => ['required', 'string'],
            'name' => ['required', 'string'],
        ];
    }
}
