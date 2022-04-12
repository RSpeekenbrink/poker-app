<?php

namespace App\Http\Requests;

use App\Services\ParticipantService;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property integer $duration
 */
class StartVotingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $participant = \Auth::user();

        return $participant ? app(ParticipantService::class)->isOwner($this->room, $participant) : false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'duration' => 'required|numeric|between:10,300',
        ];
    }
}
