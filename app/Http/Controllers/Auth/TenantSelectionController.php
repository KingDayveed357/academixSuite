<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\SchoolUser;
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

    public function store(Request $request)
    {
        $data = $request->validate(['school_id' => ['required', 'integer', 'exists:schools,id']]);
        $allowed = SchoolUser::withoutGlobalScopes()
            ->where('school_id', $data['school_id'])
            ->where('user_id', auth()->id())
            ->exists();

        abort_unless($allowed, 403);

        $school = School::withoutGlobalScopes()->findOrFail($data['school_id']);

        $request->session()->put('tenant_id', $school->id);
        $request->session()->put('school_id', $school->id);

        return redirect()->away($school->tenantUrl('/dashboard'));
    }
}
