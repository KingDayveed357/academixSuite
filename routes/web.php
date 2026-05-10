<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisterSchoolController;
use App\Http\Controllers\Auth\TenantSelectionController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\OnboardingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ─────────────────────────────────────────────────────────────────────────────
// 1. GLOBAL & CENTRAL ROUTES (academixsuite.com)
// ─────────────────────────────────────────────────────────────────────────────

Route::get('/', fn () => Inertia::render('Public/Landing'))->name('landing');

Route::middleware(['guest', 'central.only'])->group(function () {
    // School Registration
    Route::get('/register', [RegisterSchoolController::class, 'create'])->name('register.school');
    Route::post('/register', [RegisterSchoolController::class, 'store'])->name('register.school.store');

    // Central Auth (Central domain only)
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');

    // Passwords
    Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');
    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('/reset-password', [NewPasswordController::class, 'store'])->name('password.store');
});

// Tenant-specific Login (Available on subdomains)
Route::middleware(['guest'])->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('tenant.login');
    Route::post('/login', [LoginController::class, 'store'])->name('tenant.login.store');
});

Route::middleware(['guest'])->group(function () {
    // Invitations
    Route::get('/invite/{token}', [InvitationController::class, 'showAccept'])->name('invite.accept');
    Route::post('/invite/{token}', [InvitationController::class, 'accept'])->name('invite.accept.store');
});

// Auth required but tenant NOT yet selected
Route::middleware(['auth', 'central.only'])->group(function () {
    Route::get('/select-tenant', [TenantSelectionController::class, 'index'])->name('tenant.select');
    Route::post('/select-tenant', [TenantSelectionController::class, 'store'])->name('tenant.select.store');
});

Route::middleware('auth')->post('/logout', [LoginController::class, 'destroy'])->name('logout');

// ─────────────────────────────────────────────────────────────────────────────
// 2. TENANT-SCOPED APP ROUTES (Subdomain ONLY)
// ─────────────────────────────────────────────────────────────────────────────

Route::middleware(['tenant.only'])->group(function () {
    
    // ONBOARDING — Auth + Tenant required, setup incomplete
    Route::middleware(['auth', 'tenant.access'])->group(function () {
        Route::get('/register/success', function () {
            $school = app(\App\Support\Tenancy\TenantContext::class)->get();
            $membership = auth()->user()->schoolMemberships()->where('school_id', $school->id)->first();
            
            return Inertia::render('Auth/RegisterSuccess', [
                'tenant' => [
                    'name' => $school->name,
                    'slug' => $school->slug,
                ],
                'staff_id' => $membership->staff_id ?? 'XXXX-0001',
            ]);
        })->name('register.success');

        Route::get('/onboarding', [OnboardingController::class, 'show'])->name('onboarding.wizard');
        Route::post('/onboarding/settings', [OnboardingController::class, 'saveSettings'])->name('onboarding.settings');
        Route::post('/onboarding/complete', [OnboardingController::class, 'complete'])->name('onboarding.complete');
    });

    // PROTECTED APP — Auth + Tenant + Setup Complete
    Route::middleware(['auth', 'tenant.access', 'onboarded'])->group(function () {
        
        Route::get('/dashboard', [\App\Http\Controllers\Dashboard\DashboardController::class, 'index'])->name('owner.dashboard');
        
        // Staff Management
        Route::get('/staff', fn () => Inertia::render('Owner/Staff/Index'))->name('staff.index');
        Route::get('/staff/invite', [InvitationController::class, 'create'])->name('staff.invite');
        Route::post('/staff/invite', [InvitationController::class, 'store']);

        // Finance (Bursar)
        Route::prefix('finance')->name('finance.')->group(function () {
            Route::get('/', fn () => Inertia::render('Dashboard/Index'))->name('dashboard');
            Route::get('/payments', fn () => Inertia::render('Bursar/Payments/Index'))->name('payments.index');
            Route::get('/payments/record', fn () => Inertia::render('Bursar/Payments/Record'))->name('payments.record');
            Route::get('/payments/{id}', fn () => Inertia::render('Bursar/Payments/Show'))->name('payments.show');
        });

        // Students & Classes (Admin)
        Route::prefix('students')->name('students.')->group(function () {
            Route::get('/', [App\Http\Controllers\Student\StudentController::class, 'index'])->name('index');
            Route::get('/new', [App\Http\Controllers\Student\StudentController::class, 'create'])->name('create');
            Route::post('/', [App\Http\Controllers\Student\StudentController::class, 'store'])->name('store');
        });
        
        Route::get('/classes', fn () => Inertia::render('Admin/Classes/Index'))->name('classes.index');
        Route::get('/fees', fn () => Inertia::render('Admin/Fees/Index'))->name('fees.index');

        // Settings & Profile
        Route::get('/settings', fn () => Inertia::render('Owner/Settings'))->name('settings');
        Route::get('/settings/billing', fn () => Inertia::render('Settings/Billing'))->name('settings.billing');
        Route::get('/profile', fn () => Inertia::render('UserProfiles'))->name('profile');
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. MISC
// ─────────────────────────────────────────────────────────────────────────────

Route::fallback(function () {
    return Inertia::render('NotFound')->toResponse(request())->setStatusCode(404);
});

Route::get('/forbidden', function () {
    return Inertia::render('Forbidden')->toResponse(request())->setStatusCode(403);
})->name('forbidden');