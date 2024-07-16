<?php

namespace App\Http\Middleware;

use App\Models\StubUser;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class LoginStubUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($room = $request->route('room')) {
            if (Session::has($room->id.'.name')) {
                $user = new StubUser([
                    'name' => Session::get($room->id.'.name'),
                ]);

                Auth::login($user);
            }
        }

        return $next($request);
    }
}
