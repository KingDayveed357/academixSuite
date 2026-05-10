<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\SchoolOnboardingService;
use App\Services\Tenancy\TenantResolver;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RegisterSchoolController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request, SchoolOnboardingService $service, TenantResolver $resolver)
    {
        $data = $request->validate([
            'school_name' => ['required', 'string', 'max:255'],
            'location'    => ['nullable', 'string', 'max:255'],
            'name'        => ['required', 'string', 'max:255'],
            'email'       => ['required', 'email', 'max:255', 'unique:users,email'],
            'password'    => ['required', 'string', 'min:8', 'confirmed'],
            'slug'        => ['nullable', 'string', 'alpha_dash', 'max:80', 'unique:schools,slug'],
        ]);

        $data['slug'] = $data['slug'] ?: Str::slug($data['school_name']);

        $result = $service->onboard($data);

        auth()->login($result['user']);
        
        $resolver->bind($result['school']);
        $request->session()->put('membership_role', 'school_owner');

        // Redirect to registration success page
        return Inertia::location($result['school']->tenantUrl('/register/success'));
    }
}
