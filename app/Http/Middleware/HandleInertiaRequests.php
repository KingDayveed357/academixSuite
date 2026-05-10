<?php

namespace App\Http\Middleware;

use App\Models\Membership;
use App\Services\PlanService;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     */
    protected $rootView = 'app';

    public function __construct(
        private readonly TenantContext $tenantContext,
        private readonly PlanService $planService,
    ) {}

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
            $membership = Membership::withoutGlobalScopes()
                ->where('school_id', $school->id)
                ->where('user_id', $user->id)
                ->first(['role', 'staff_id', 'status']);
        }

        return [
            ...parent::share($request),
            'app_url' => config('app.url'),
            'support_whatsapp' => config('app.support_whatsapp'),
            'is_central' => ! $school,
            'auth' => [
                'user'       => $user,
                'membership' => $membership,
                'role'       => $membership?->role ? strtoupper($membership->role) : null,
                'permissions' => $this->getPermissions($membership),
            ],
            'tenant' => $school ? [
                'id'                   => $school->id,
                'name'                 => $school->name,
                'slug'                 => $school->slug,
                'domain'               => $school->domain,
                'onboarding_completed' => $school->onboarding_completed,
                'student_count'        => $school->students()->count(),
                'staff_count'          => $school->staff()->count(),
                'metadata' => [
                    'address'       => $school->address,
                    'contact_email' => $school->contact_email,
                    'contact_phone' => $school->contact_phone,
                    'logo_path'     => $school->logo_path,
                ],
                // Only share settings if onboarding is NOT complete to save payload size on dashboard
                'onboarding_settings' => ! $school->onboarding_completed 
                    ? $school->onboardingSettings()->pluck('value', 'key') 
                    : null,
            ] : null,
            'plan' => $school ? [
                'name'                  => $school->plan ?? 'free',
                'student_limit_reached' => $this->planService->studentLimitReached($school),
                'student_limit_warning' => $this->planService->studentLimitWarning($school),
                'can_export_pdf'        => $this->planService->can($school, 'can_export_pdf'),
                'can_export_csv'        => $this->planService->can($school, 'can_export_csv'),
            ] : null,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
                'staff_id' => fn () => $request->session()->get('staff_id'),
            ],
        ];
    }

    private function getPermissions(?Membership $membership): array
    {
        if (! $membership) {
            return [];
        }

        $role = strtolower($membership->role);

        return [
            'can_manage_staff'    => in_array($role, ['school_owner', 'school_admin']),
            'can_manage_finance'  => in_array($role, ['school_owner', 'bursar']),
            'can_manage_students' => in_array($role, ['school_owner', 'school_admin']),
            'can_view_analytics'  => in_array($role, ['school_owner']),
            'is_owner'            => $role === 'school_owner',
        ];
    }
}
