<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(\App\Support\Tenancy\TenantContext $tenantContext)
    {
        $school = $tenantContext->get();
        return Inertia::render('Dashboard/Index', [
            'activation' => [
                'class_created'     => !is_null($school->first_class_created_at),
                'student_added'     => !is_null($school->first_student_added_at),
                'payment_recorded'  => !is_null($school->first_payment_recorded_at),
                'all_complete'      => !is_null($school->first_class_created_at) 
                                       && !is_null($school->first_student_added_at) 
                                       && !is_null($school->first_payment_recorded_at),
            ],
        ]);
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
