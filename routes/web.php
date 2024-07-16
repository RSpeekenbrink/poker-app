<?php

use App\Http\Controllers\RoomController;
use App\Models\Room;
use Illuminate\Support\Facades\Route;

Route::bind('room', function ($value) {
    return Room::where('slug', $value)->first();
});

Route::get('/', [RoomController::class, 'index'])->name('index');

Route::post('/', [RoomController::class, 'store'])->name('room.create');

Route::get('/join/{room}', [RoomController::class, 'joinForm'])->name('room.join');
Route::post('/join/{room}', [RoomController::class, 'join'])->name('room.join.request');

Route::get('/{room}', [RoomController::class, 'show'])->name('room.show');
