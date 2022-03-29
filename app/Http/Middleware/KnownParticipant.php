<?php

namespace App\Http\Middleware;

use App\Services\ParticipantService;
use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class KnownParticipant
{
    /** @var ParticipantService */
    protected ParticipantService $participantService;

    /**
     * @param ParticipantService $participantService
     */
    public function __construct(ParticipantService $participantService)
    {
        $this->participantService = $participantService;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @param  string|null  ...$guards
     * @return \Illuminate\Http\Response|RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        return $this->redirectIfNotParticipant() ?? $next($request);
    }

    /**
     * Determine if user is logged in as participant.
     *
     * @return RedirectResponse|null
     */
    protected function redirectIfNotParticipant(): ?RedirectResponse
    {
        if (!$this->participantService->hasInSession()) {
            return Redirect::route('participant.create');
        }

        return null;
    }
}
