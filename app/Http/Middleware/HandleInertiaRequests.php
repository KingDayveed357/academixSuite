<?php

namespace App\Http\Middleware;

use App\Models\SchoolUser;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     */
    protected $rootView = 'app';

    public function __construct(private readonly TenantContext $tenantContext) {}

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     */
    public function share(Request $request): array
    {
        $user   = $request->user();
        $school = $this->tenantContext->get();

        // Load current membership for the authenticated user in this tenant
        $membership = null;
        if ($user && $school) {
            $membership = SchoolUser::withoutGlobalScopes()
                ->where('school_id', $school->id)
                ->where('user_id', $user->id)
                ->first(['role', 'staff_id', 'status']);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user'       => $user,
                'membership' => $membership,
                'role'       => $membership?->role ? strtoupper($membership->role) : null,
            ],
            'tenant' => $school ? [
                'id'                   => $school->id,
                'name'                 => $school->name,
                'slug'                 => $school->slug,
                'domain'               => $school->domain,
                'onboarding_completed' => $school->onboarding_completed,
            ] : null,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
                'staff_id' => fn () => $request->session()->get('staff_id'),
            ],
        ];
    }
}
