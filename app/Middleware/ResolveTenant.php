<?php

namespace App\Middleware;

use App\Services\TenantService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResolveTenant
{
    public function __construct(private readonly TenantService $tenantService)
    {
    }

    public function handle(Request $request, Closure $next): Response
    {
        $tenant = $this->tenantService->resolveFromRequest($request);

        $guestRoutes = [
            'landing',
            'login',
            'login.store',
            'register.school',
            'register.school.store',
            'tenant.select',
            'tenant.select.store',
        ];

        if (! $tenant && ! $request->routeIs(...$guestRoutes) && ! $request->routeIs('preview.*', 'platform.*')) {
            return redirect()->route('landing');
        }

        if ($tenant && ! $this->tenantService->enforceHostMatch($request, $tenant)) {
            auth()->logout();
            $request->session()->invalidate();

            return redirect()->route('login');
        }

        return $next($request);
    }
}
