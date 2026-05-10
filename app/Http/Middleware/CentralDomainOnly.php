<?php

namespace App\Http\Middleware;

use App\Services\Tenancy\TenantResolver;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CentralDomainOnly
{
    public function __construct(private readonly TenantResolver $resolver)
    {
    }

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($this->resolver->isSubdomainRequest($request)) {
            // Redirect to central domain equivalent
            $scheme = parse_url(config('app.url'), PHP_URL_SCHEME) ?: 'http';
            $host = parse_url(config('app.url'), PHP_URL_HOST);
            $port = parse_url(config('app.url'), PHP_URL_PORT);
            $portSuffix = $port ? ':' . $port : '';

            return redirect()->away($scheme . '://' . $host . $portSuffix . $request->getRequestUri());
        }

        return $next($request);
    }
}
