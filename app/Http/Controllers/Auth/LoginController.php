<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\SchoolUser;
use App\Models\User;
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

    public function store(Request $request, TenantContext $tenantContext)
    {
        $credentials = $request->validate([
            'staff_id' => ['required', 'string'],
            'password' => ['required', 'string'],
            'remember' => ['boolean'],
        ]);

        $school = $tenantContext->get();

        $membershipQuery = SchoolUser::withoutGlobalScopes()
            ->where('staff_id', $credentials['staff_id']);

        if ($school) {
            $membershipQuery->where('school_id', $school->id);
        }

        $membership = $membershipQuery->first();

        if (! $membership) {
            throw ValidationException::withMessages([
                'staff_id' => $school
                    ? 'No account found with this Staff ID in your school.'
                    : 'Could not resolve school. Please access via your school subdomain.',
            ]);
        }

        if (! $school) {
            $school = School::withoutGlobalScopes()->find($membership->school_id);
        }

        if (! $school) {
            throw ValidationException::withMessages([
                'staff_id' => 'Could not resolve school. Please access via your school subdomain.',
            ]);
        }

        if ($membership->status !== 'active') {
            throw ValidationException::withMessages([
                'staff_id' => 'Your account has been suspended. Please contact your administrator.',
            ]);
        }

        $user = User::find($membership->user_id);

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'password' => 'Incorrect password.',
            ]);
        }

        Auth::login($user, $credentials['remember'] ?? false);
        $request->session()->regenerate();
        $request->session()->put('tenant_id', $school->id);
        $request->session()->put('school_id', $school->id);
        $request->session()->put('membership_role', $membership->role);

        // Role-based redirect
        return match ($membership->role) {
            'school_owner' => redirect()->route('owner.dashboard'),
            'school_admin' => redirect()->route('admin.dashboard'),
            'bursar'       => redirect()->route('finance.dashboard'),
            default        => redirect()->route('owner.dashboard'),
        };
    }

    public function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
