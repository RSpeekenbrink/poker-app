<?php

namespace App\Http\Requests;

use App\Enums\Vote;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\Rule;

/**
 * @property boolean $show
 */
class ShowRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (! $room = Request::route('room')) {
            return false;
        }

        return session()->has($room->id.'-name');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'show' => ['required', 'boolean'],
        ];
    }
}
