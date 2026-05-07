<?php

namespace App\Services;

use App\Models\School;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\Request;

class TenantService
{
    public function __construct(private readonly TenantContext $tenantContext)
    {
    }

    private function getBaseHost(): string
    {
        return School::tenantBaseHost();
    }

    private function extractTenantSlug(string $host): ?string
    {
        $baseHost = $this->getBaseHost();

        if ($host === $baseHost) {
            return null;
        }

        $suffix = '.' . $baseHost;

        if (! str_ends_with($host, $suffix)) {
            return null;
        }

        $slug = substr($host, 0, -strlen($suffix));

        return $slug !== '' ? $slug : null;
    }

    public function resolveFromRequest(Request $request): ?School
    {
        $host = $request->getHost();
        $slug = $this->extractTenantSlug($host);

        $school = null;

        if ($slug) {
            $school = School::withoutGlobalScopes()
                ->where('domain', $host)
                ->orWhere('slug', $slug)
                ->first();
        } else {
            $schoolId = $request->session()->get('tenant_id') ?? $request->session()->get('school_id');

            if ($schoolId) {
                $school = School::withoutGlobalScopes()->find($schoolId);
            }
        }

        $this->tenantContext->set($school);

        if ($school) {
            $request->session()->put('tenant_id', $school->id);
            $request->session()->put('school_id', $school->id);
        }

        return $school;
    }

    public function enforceHostMatch(Request $request, School $school): bool
    {
        return $request->getHost() === $school->domain;
    }
}
