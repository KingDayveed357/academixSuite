<?php

namespace App\Http\Middleware;

use App\Models\Membership;
use App\Support\Tenancy\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserBelongsToTenant
{
    public function __construct(private readonly TenantContext $tenantContext) {}

    public function handle(Request $request, Closure $next): Response
    {
        $school = $this->tenantContext->get();

        if (! $school) {
            return $next($request);
        }

        $user = $request->user();

        if (! $user) {
            return redirect()->route('tenant.login');
        }

        $membership = Membership::withoutGlobalScopes()
            ->where('school_id', $school->id)
            ->where('user_id', $user->id)
            ->first();

        if (! $membership) {
            abort(403, 'You are not a member of this school.');
        }

        if ($membership->status !== 'active') {
            abort(403, 'Your account has been suspended.');
        }

        // Share membership context for the request lifecycle
        $request->merge(['current_membership' => $membership]);

        return $next($request);
    }
}
