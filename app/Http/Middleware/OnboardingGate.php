<?php

namespace App\Http\Middleware;

use App\Support\Tenancy\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OnboardingGate
{
    public function __construct(private readonly TenantContext $tenantContext)
    {
    }

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $school = $this->tenantContext->get();

        if ($school && ! $school->onboarding_completed && ! $request->is('onboarding*')) {
            return redirect()->route('onboarding.wizard');
        }

        return $next($request);
    }
}
