<?php

use App\Http\Middleware\EnsureOnboardingComplete;
use App\Http\Middleware\EnsureUserBelongsToTenant;
use App\Http\Middleware\ResolveTenantFromSubdomain;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Append to the global web stack — runs on every request
        $middleware->web(append: [
            \App\Http\Middleware\ResolveTenant::class,
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // Named middleware aliases for route groups
        $middleware->alias([
            'tenant.resolve' => \App\Http\Middleware\ResolveTenant::class,
            'tenant.access'  => \App\Http\Middleware\EnsureTenantAccess::class,
            'tenant.only'    => \App\Http\Middleware\TenantSubdomainOnly::class,
            'central.only'   => \App\Http\Middleware\CentralDomainOnly::class,
            'onboarded'      => \App\Http\Middleware\OnboardingGate::class,
            'auth'           => \App\Http\Middleware\CustomAuthenticate::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Throwable $e, Request $request) {
            if ($e instanceof HttpExceptionInterface && $e->getStatusCode() === 403 && ! $request->expectsJson()) {
                return Inertia::render('Forbidden')->toResponse($request)->setStatusCode(403);
            }

            return null;
        });
    })->create();
