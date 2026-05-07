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
        ]);

        $school = $this->tenantContext->get();

        if (! $school) {
            return back()->with('success', 'Settings saved.');
        }

        $this->onboardingService->saveSettings($school, array_filter($data, fn($v) => $v !== null));

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
