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
Route::post('/create-room', [RoomController::class, 'create'])->name('room.create');
Route::get('/{room}', [RoomController::class, 'show'])->middleware('known-participant')->name('room.show');
