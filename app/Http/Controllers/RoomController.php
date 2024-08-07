<?php

namespace App\Http\Controllers;

use App\Enums\Vote;
use App\Events\ResetEvent;
use App\Events\ShowEvent;
use App\Events\VotedEvent;
use App\Http\Requests\CreateRoomRequest;
use App\Http\Requests\JoinRoomRequest;
use App\Http\Requests\ResetRequest;
use App\Http\Requests\ShowRequest;
use App\Http\Requests\VoteRequest;
use App\Models\Room;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

use function session;

class RoomController extends Controller
{
    protected function authenticateAndRedirectToRoom(Room $room, FormRequest $request): RedirectResponse
    {
        if (! Auth::check()) {
            $id = Str::uuid()->toString();

            session(['user-id' => $id]);

            if (! Auth::attempt(['id' => $id])) {
                return Redirect::route('index');
            }

            $request->session()->regenerate();
        }

        session(['ses_id' => session()->getId()]);
        session([$room->id.'-name' => $request->name]);

        return Redirect::route('room.show', $room->slug);
    }

    public function index(): Response
    {
        return Inertia::render('Rooms/Index', [
            'error' => session('error'),
        ]);
    }

    public function store(CreateRoomRequest $request): RedirectResponse
    {
        $room = Room::query()->create([
            'name' => $request->room_name,
        ]);

        return $this->authenticateAndRedirectToRoom($room, $request);
    }

    public function show(Room $room): RedirectResponse|Response
    {
        if (! Auth::check() || ! session()->has($room->id.'-name')) {
            return Redirect::route('room.join', $room->slug);
        }

        return Inertia::render('Rooms/Show', [
            'room' => ['slug' => $room->slug, 'name' => $room->name, 'votes' => $room->votes, 'show' => $room->show],
            'user' => ['id' => Auth::user()->id, 'name' => session($room->id.'-name')],
        ]);
    }

    public function joinForm(Room $room): RedirectResponse|Response
    {
        if (Auth::check() && session()->has($room->id.'-name')) {
            return Redirect::route('room.show', $room->slug);
        }

        return Inertia::render('Rooms/Join', [
            'room' => ['slug' => $room->slug, 'name' => $room->name],
        ]);
    }

    public function join(Room $room, JoinRoomRequest $request): RedirectResponse
    {
        return $this->authenticateAndRedirectToRoom($room, $request);
    }

    public function vote(Room $room, VoteRequest $request): \Illuminate\Http\Response
    {
        $userId = Auth::user()->id;

        $lock = Cache::lock('voting.'.$room->id, 10);

        $lock->get(function () use ($room, $request, $userId) {
            $votes = $room->votes;
            $votes[$userId] = $request->vote;

            $room->update(['votes' => $votes]);

            VotedEvent::dispatch($room, $userId, Vote::from($request->vote));
        });

        return response()->noContent();
    }

    public function showVotes(Room $room, ShowRequest $request): \Illuminate\Http\Response
    {
        $lock = Cache::lock('voting.'.$room->id, 10);

        $lock->get(function () use ($room, $request) {
            $room->update(['show' => $request->show]);

            ShowEvent::dispatch($room, $request->show);
        });

        return response()->noContent();
    }

    public function reset(Room $room, ResetRequest $request): \Illuminate\Http\Response
    {
        $lock = Cache::lock('voting.'.$room->id, 10);

        $lock->get(function () use ($room, $request) {
            $room->update(['votes' => null, 'show' => false]);

            ResetEvent::dispatch($room);
        });

        return response()->noContent();
    }
}
