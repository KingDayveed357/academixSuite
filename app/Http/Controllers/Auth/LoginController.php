<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\Membership;
use App\Models\User;
use App\Services\Auth\MembershipService;
use App\Services\Tenancy\TenantResolver;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Login', [
            'status' => session('status'),
        ]);
    }

    public function store(Request $request, TenantResolver $resolver, MembershipService $membershipService)
    {
        $input = $request->validate([
            'identity' => ['required', 'string'],
            'password' => ['required', 'string'],
            'remember' => ['boolean'],
        ]);

        $school = $resolver->resolve($request);
        $user = null;

        // 1. Resolve User
        if (filter_var($input['identity'], FILTER_VALIDATE_EMAIL)) {
            $user = User::where('email', $input['identity'])->first();
        } elseif ($school) {
            // Staff ID Login (Only on subdomains)
            $user = User::findByStaffId($input['identity'], $school->id);
        }

        // 2. Pre-auth Subdomain Check
        if ($school) {
            if (! $user || ! $user->membershipFor($school->id)) {
                throw ValidationException::withMessages([
                    'identity' => 'This account isn’t registered under this school. Please confirm your school’s login link or try the main login page.',
                ]);
            }
        }

        // 3. Verify Password
        if (! $user || ! Hash::check($input['password'], $user->password)) {
            throw ValidationException::withMessages([
                'identity' => 'Invalid credentials.',
            ]);
        }

        // 4. Determine Redirection Path
        $memberships = $membershipService->getActiveMemberships($user);

        if ($memberships->isEmpty()) {
            Auth::login($user, $input['remember'] ?? false);
            $request->session()->regenerate();
            return redirect()->route('register.school');
        }

        // Case A: On a Subdomain
        if ($school) {
            $membership = $memberships->firstWhere('school_id', $school->id);
            if (! $membership) {
                throw ValidationException::withMessages([
                    'identity' => 'You do not have permission to access this school.',
                ]);
            }

            Auth::login($user, $input['remember'] ?? false);
            $request->session()->regenerate();
            $resolver->bind($school);
            
            // USE Inertia::location for cross-subdomain or full-page redirects to avoid CORS/XHR issues
            return Inertia::location($school->tenantUrl('/dashboard'));
        }

        // Case B: Central Login
        Auth::login($user, $input['remember'] ?? false);
        $request->session()->regenerate();

        if ($memberships->count() === 1) {
            $school = $memberships->first()->school;
            return Inertia::location($school->tenantUrl('/dashboard'));
        }

        // Multiple schools -> Selector (On central domain)
        return redirect()->route('tenant.select');
    }

    public function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect to central login to ensure a clean state
        return Inertia::location(config('app.url') . '/login');
    }
}
