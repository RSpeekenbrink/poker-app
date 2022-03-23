<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Load application's homepage.
     *
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Index');
    }
}
