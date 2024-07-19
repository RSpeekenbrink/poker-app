<?php

namespace App\Enums;

enum Vote: string
{
    case BREAK = '☕';
    case UNSURE = '?';
    case ONE = '1';
    case TWO = '2';
    case THREE = '3';
    case FIVE = '5';
    case EIGHT = '8';
    case THIRTEEN = '13';
    case TWENTY = '20';
}
