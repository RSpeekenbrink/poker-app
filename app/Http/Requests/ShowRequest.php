<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Request;

/**
 * @property bool $show
 */
class ShowRequest extends FormRequest
{
    public function authorize(): bool
    {
        if (! $room = Request::route('room')) {
            return false;
        }

        return session()->has($room->id.'-name');
    }

    public function rules(): array
    {
        return [
            'show' => ['required', 'boolean'],
        ];
    }
}
