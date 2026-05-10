<?php

namespace App\Http\Middleware;

use App\Services\Tenancy\TenantResolver;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ResolveTenant
{
    public function __construct(private readonly TenantResolver $resolver)
    {
    }

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $tenant = $this->resolver->resolve($request);

        // If it's a subdomain request but no tenant was found, return 404
        if (! $tenant && $this->resolver->isSubdomainRequest($request)) {
            return Inertia::render('NotFound')->toResponse($request)->setStatusCode(404);
        }

        // If a tenant is resolved, we can attach it to the request for easier access
        if ($tenant) {
            $request->merge(['tenant' => $tenant]);
        }

        return $next($request);
    }
}
