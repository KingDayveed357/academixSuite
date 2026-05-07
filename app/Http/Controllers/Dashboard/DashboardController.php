<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function owner()
    {
        return Inertia::render('Dashboard/Owner');
    }

    public function admin()
    {
        return Inertia::render('Dashboard/Admin');
    }

    public function bursar()
    {
        return Inertia::render('Dashboard/Bursar');
    }
}
