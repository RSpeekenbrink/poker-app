<?php

namespace App\Http\Requests;

use App\Enums\Vote;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\Rule;

/**
 * @property string $vote
 */
class VoteRequest extends FormRequest
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
            'vote' => ['required', Rule::enum(Vote::class)],
        ];
    }
}
