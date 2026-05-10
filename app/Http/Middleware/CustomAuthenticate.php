<?php

namespace App\Http\Middleware;

use App\Support\Tenancy\TenantContext;
use Illuminate\Auth\AuthManager;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class CustomAuthenticate extends Middleware
{
    public function __construct(
        AuthManager $auth,
        private TenantContext $tenantContext,
    ) {
        parent::__construct($auth);
    }

    protected function redirectTo(Request $request): ?string
    {
        if ($request->expectsJson()) {
            return null;
        }

        // If on a tenant subdomain (via the tenant.only middleware indicator),
        // always use tenant.login. Otherwise use central login.
        if ($request->route() && $request->route()->getPrefix() === '') {
            // Check if this is a subdomain-only route by looking at middleware
            $middleware = $request->route()->middleware();
            if (in_array('tenant.only', $middleware) || $this->tenantContext->get()) {
                return '/login';  // On subdomain, use local /login which is tenant.login
            }
        }

        // For central routes or when no tenant context, use the named route
        try {
            return route('login');
        } catch (\Exception $e) {
            // If 'login' route doesn't exist (on subdomain), fall back to path
            return '/login';
        }
    }
}
