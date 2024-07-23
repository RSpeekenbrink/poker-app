<?php

use App\Http\Controllers\RoomController;
use App\Models\Room;
use Illuminate\Support\Facades\Route;

Route::bind('room', function ($value) {
    return Room::where('slug', $value)->first();
});

Route::get('/', [RoomController::class, 'index'])->name('index');

Route::post('/', [RoomController::class, 'store'])->name('room.create');

Route::missing(fn () => redirect()->route('index')->with(
    [
        'error' => __("The room you tried to join doesn't exist. Please create a new one."),
    ]
))->group(function () {
    Route::get('/join/{room}', [RoomController::class, 'joinForm'])->name('room.join');
    Route::post('/join/{room}', [RoomController::class, 'join'])->name('room.join.request');
    Route::post('/{room}/vote', [RoomController::class, 'vote'])->name('room.vote');
    Route::post('/{room}/show', [RoomController::class, 'showVotes'])->name('room.showVotes');
    Route::post('/{room}/reset', [RoomController::class, 'reset'])->name('room.reset');

    Route::get('/{room}', [RoomController::class, 'show'])->name('room.show');
});
