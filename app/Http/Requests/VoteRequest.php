<?php

namespace App\Http\Requests;

use App\Contracts\RoomService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @property string $vote
 */
class VoteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $participant = \Auth::user();

        return $participant ? app(RoomService::class)->hasParticipant($this->room, $participant) : false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'vote' => ['required', Rule::in(app(RoomService::class)->getVotingOptions())]
        ];
    }
}
