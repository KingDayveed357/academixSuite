<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\Membership;
use App\Services\Tenancy\TenantResolver;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantSelectionController extends Controller
{
    public function index()
    {
        $schools = auth()->user()
            ?->schools()
            ->withPivot(['role', 'staff_id', 'status'])
            ->get(['schools.id', 'schools.name', 'schools.slug', 'schools.domain', 'schools.location'])
            ->map(fn (School $school) => [
                'id'       => $school->id,
                'name'     => $school->name,
                'slug'     => $school->slug,
                'domain'   => $school->domain,
                'location' => $school->location,
                'role'     => strtoupper((string) $school->pivot?->role),
            ]) ?? collect();

        return Inertia::render('Auth/SelectTenant', ['schools' => $schools]);
    }

    public function store(Request $request, TenantResolver $resolver)
    {
        $data = $request->validate(['school_id' => ['required', 'integer', 'exists:schools,id']]);
        $membership = Membership::withoutGlobalScopes()
            ->where('school_id', $data['school_id'])
            ->where('user_id', auth()->id())
            ->first();

        abort_unless($membership, 403);

        $school = $membership->school;
        $resolver->bind($school);
        $request->session()->put('membership_role', $membership->role);

        return Inertia::location($school->tenantUrl('/dashboard'));
    }
}
