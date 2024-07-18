<?php

use App\Broadcasting\RoomChannel;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('room.{roomId}', RoomChannel::class);
