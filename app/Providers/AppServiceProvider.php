<?php

namespace App\Providers;

use App\Contracts\ParticipantService as ParticipantServiceContract;
use App\Contracts\RoomService as RoomServiceContract;
use App\Services\ParticipantService;
use App\Services\RoomService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * All of the container singletons that should be registered.
     *
     * @var array
     */
    public array $singletons = [
        RoomServiceContract::class => RoomService::class,
        ParticipantServiceContract::class => ParticipantService::class,
    ];

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
