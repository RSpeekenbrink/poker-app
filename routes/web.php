<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\RoomController;
use App\Services\RoomService;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::bind('room', function ($value) {
    return app(RoomService::class)->getByUuid($value);

});

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::post('/leave', [RoomController::class, 'leave'])->name('room.leave');
Route::post('/create-room', [RoomController::class, 'create'])->name('room.create');
Route::get('/{room}/join', [RoomController::class, 'showJoin'])->middleware('guest')->name('room.join');
Route::post('/{room}/join', [RoomController::class, 'join'])->middleware('guest')->name('room.join.attempt');
Route::post('/{room}/start-voting', [RoomController::class, 'startVoting'])->middleware('auth')->name('room.startVoting');
Route::post('/{room}/vote', [RoomController::class, 'vote'])->middleware('auth')->name('room.vote');
Route::get('/{room}', [RoomController::class, 'show'])->middleware('auth')->name('room.show');
