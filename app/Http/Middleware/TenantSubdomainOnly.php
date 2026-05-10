<?php

namespace App\Http\Middleware;

use App\Services\Tenancy\TenantResolver;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TenantSubdomainOnly
{
    public function __construct(private readonly TenantResolver $resolver)
    {
    }

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $this->resolver->isSubdomainRequest($request)) {
            // If on central domain trying to access tenant-only routes, redirect to login or show 404
            // Since dashboard and app routes MUST be via subdomain.
            abort(404);
        }

        return $next($request);
    }
}
