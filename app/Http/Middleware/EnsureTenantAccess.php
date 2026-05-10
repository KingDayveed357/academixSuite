<?php

namespace App\Http\Middleware;

use App\Support\Tenancy\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class EnsureTenantAccess
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
        $user = $request->user();

        // 1. Strict Tenant Resolution Check
        // If we reached this middleware but no school was resolved, it means the slug/subdomain was invalid.
        if (! $school) {
            return Inertia::render('NotFound')->toResponse($request)->setStatusCode(404);
        }

        // 2. Authentication Check
        if (! $user) {
            // For tenant-scoped routes, if not authenticated, redirect to the specific tenant login or central login
            // Using tenant login for subdomain-based requests
            return redirect()->route('tenant.login');
        }

        // 3. Membership Validation
        $membership = $user->membershipFor($school->id);

        if (! $membership) {
            // User is logged in but not a member of THIS school
            return Inertia::render('Forbidden')->toResponse($request)->setStatusCode(403);
        }

        if ($membership->isBanned()) {
            abort(403, 'Your account has been suspended.');
        }

        // 4. Session Consistency
        // If the user is on a different tenant than their session, update it
        if (session('active_tenant_id') !== $school->id) {
            session(['active_tenant_id' => $school->id]);
        }

        // Update last accessed
        $membership->update(['last_accessed_at' => now()]);

        return $next($request);
    }
}
