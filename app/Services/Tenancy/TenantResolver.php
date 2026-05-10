<?php

namespace App\Services\Tenancy;

use App\Models\School;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\Request;

class TenantResolver
{
    public function __construct(private readonly TenantContext $tenantContext)
    {
    }

    /**
     * Resolve the tenant from the incoming request.
     */
    public function resolve(Request $request): ?School
    {
        // Resolve from Subdomain only
        if ($school = $this->resolveFromSubdomain($request)) {
            return $this->bind($school);
        }

        return null;
    }

    /**
     * Bind the school to the current application context.
     */
    public function bind(School $school): School
    {
        $this->tenantContext->set($school);
        
        // Ensure session consistency
        if (request()->hasSession()) {
            request()->session()->put('active_tenant_id', $school->id);
        }

        return $school;
    }

    private function resolveFromSubdomain(Request $request): ?School
    {
        $host = $request->getHost();
        $baseHost = School::tenantBaseHost();

        // 1. Exact match on base host (no subdomain)
        if ($host === $baseHost) {
            return null;
        }

        // 2. Check if it's actually a subdomain of our base host
        if (! str_ends_with($host, '.' . $baseHost)) {
            return null;
        }

        $slug = explode('.', $host)[0];

        // 3. Ignore 'www' if it's not a tenant slug
        if ($slug === 'www') {
            return null;
        }

        $school = School::withoutGlobalScopes()->where('slug', $slug)->first();

        return $school;
    }

    public function isSubdomainRequest(Request $request): bool
    {
        $host = $request->getHost();
        $baseHost = School::tenantBaseHost();

        if ($host === $baseHost) {
            return false;
        }

        if (! str_ends_with($host, '.' . $baseHost)) {
            return false;
        }

        $slug = explode('.', $host)[0];

        return $slug !== 'www';
    }
}
