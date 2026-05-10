<?php

namespace App\Http\Controllers;

use App\Services\SchoolOnboardingService;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function __construct(
        private readonly TenantContext $tenantContext,
        private readonly SchoolOnboardingService $onboardingService,
    ) {}

    public function show()
    {
        $school = $this->tenantContext->get();

        if ($school?->onboarding_completed) {
            return redirect()->route('owner.dashboard');
        }

        // Pass existing settings to re-hydrate the wizard
        $settings = $school?->onboardingSettings()->pluck('value', 'key') ?? collect();

        return Inertia::render('Onboarding/Wizard', [
            'school'       => $school,
            'settings'     => $settings,
            'membership'   => auth()->user()?->membershipFor($school?->id),
        ]);
    }

    public function saveSettings(Request $request)
    {
        $data = $request->validate([
            'academic_session' => ['nullable', 'string', 'max:20'],
            'currency'         => ['nullable', 'string', 'max:10'],
            'fee_template'     => ['nullable', 'string', 'in:standard,tertiary,custom'],
            'classes'          => ['nullable', 'string'],
            'address'          => ['nullable', 'string', 'max:500'],
            'contact_email'    => ['nullable', 'email', 'max:255'],
            'contact_phone'    => ['nullable', 'string', 'max:20'],
            'logo_path'        => ['nullable', 'string', 'max:255'],
            'wizard_step'      => ['nullable', 'integer'],
        ]);

        $school = $this->tenantContext->get();

        if (! $school) {
            return back()->with('error', 'School context not found.');
        }

        // Separate school model fields from onboarding_settings
        $schoolFields = ['address', 'contact_email', 'contact_phone', 'logo_path'];
        $updateData = array_intersect_key($data, array_flip($schoolFields));
        $settingsData = array_diff_key($data, array_flip($schoolFields));

        if (! empty($updateData)) {
            $school->update(array_filter($updateData, fn($v) => $v !== null));
        }

        if (! empty($settingsData)) {
            $this->onboardingService->saveSettings($school, array_filter($settingsData, fn($v) => $v !== null));
        }

        return back()->with('success', 'Settings saved.');
    }

    public function complete(Request $request)
    {
        $school = $this->tenantContext->get();

        if (! $school) {
            return redirect()->route('owner.dashboard')->with('success', 'Welcome to AcademixSuite!');
        }

        $this->onboardingService->complete($school);

        return redirect()->away($school->tenantUrl('/dashboard'))->with('success', 'Welcome to AcademixSuite!');
    }
}
