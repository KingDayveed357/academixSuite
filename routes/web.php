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
// PUBLIC — Landing page (no tenant required)
// ─────────────────────────────────────────────────────────────────────────────
Route::get('/', fn () => Inertia::render('Public/Landing'))->name('landing');

Route::redirect('/register-school', '/register');

// ─────────────────────────────────────────────────────────────────────────────
// AUTH — Guest routes (no auth required)
// ─────────────────────────────────────────────────────────────────────────────
Route::middleware('guest')->group(function () {
    // School registration (creates tenant + owner)
    Route::get('/register', [RegisterSchoolController::class, 'create'])->name('register.school');
    Route::post('/register', [RegisterSchoolController::class, 'store'])->name('register.school.store');

    // Login (tenant-aware — resolved by ResolveTenantFromSubdomain)
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');

    Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');

    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('/reset-password', [NewPasswordController::class, 'store'])->name('password.store');

    // Invitation acceptance (public link)
    Route::get('/invite/{token}', [InvitationController::class, 'showAccept'])->name('invite.accept');
    Route::post('/invite/{token}', [InvitationController::class, 'accept'])->name('invite.accept.store');
});

// Logout
Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

// Tenant selection (for users belonging to multiple schools)
Route::get('/select-tenant', [TenantSelectionController::class, 'index'])->name('tenant.select');
Route::post('/select-tenant', [TenantSelectionController::class, 'store'])->name('tenant.select.store');

// ─────────────────────────────────────────────────────────────────────────────
// ONBOARDING — Auth + Tenant required, onboarding NOT yet complete
// ─────────────────────────────────────────────────────────────────────────────
Route::middleware(['tenant'])->group(function () {
    Route::get('/onboarding', [OnboardingController::class, 'show'])->name('onboarding.wizard');
    Route::post('/onboarding/settings', [OnboardingController::class, 'saveSettings'])->name('onboarding.settings');
    Route::post('/onboarding/complete', [OnboardingController::class, 'complete'])->name('onboarding.complete');
});

// ─────────────────────────────────────────────────────────────────────────────
// PROTECTED APP — Auth + Tenant + Onboarding complete
// ─────────────────────────────────────────────────────────────────────────────
Route::middleware(['tenant', 'onboarded'])->group(function () {

    // ── School Owner ──────────────────────────────────────────────────────────
    Route::get('/dashboard', fn () => Inertia::render('Dashboard/Index'))->name('owner.dashboard');
    Route::get('/staff', fn () => Inertia::render('Owner/Staff/Index'))->name('staff.index');
    Route::get('/dashboard/analytics', fn () => Inertia::render('Owner/Analytics'))->name('dashboard.analytics');
    Route::get('/staff/invite', [InvitationController::class, 'create'])->name('staff.invite');
    Route::post('/staff/invite', [InvitationController::class, 'store']);
    Route::get('/settings', fn () => Inertia::render('Owner/Settings'))->name('settings');
    Route::get('/billing', fn () => Inertia::render('Owner/Billing'))->name('billing');
    Route::get('/profile', fn () => Inertia::render('UserProfiles'))->name('profile');

    // ── School Admin ──────────────────────────────────────────────────────────
    Route::get('/admin', fn () => Inertia::render('Dashboard/Index'))->name('admin.dashboard');

    Route::prefix('students')->name('students.')->group(function () {
        Route::get('/', fn () => Inertia::render('Admin/Students/Index'))->name('index');
        Route::get('/new', fn () => Inertia::render('Admin/Students/Create'))->name('create');
        Route::get('/{id}', fn () => Inertia::render('Admin/Students/Show'))->name('show');
        Route::get('/{id}/enrollment', fn () => Inertia::render('Admin/Students/Enrollment'))->name('enrollment');
    });

    Route::get('/classes', fn () => Inertia::render('Admin/Classes/Index'))->name('classes.index');
    Route::get('/fees', fn () => Inertia::render('Admin/Fees/Index'))->name('fees.index');

    // ── Bursar ────────────────────────────────────────────────────────────────
    Route::prefix('finance')->name('finance.')->group(function () {
        Route::get('/', fn () => Inertia::render('Dashboard/Index'))->name('dashboard');
        Route::get('/payments', fn () => Inertia::render('Bursar/Payments/Index'))->name('payments.index');
        Route::get('/payments/record', fn () => Inertia::render('Bursar/Payments/Record'))->name('payments.record');
        Route::get('/payments/{id}', fn () => Inertia::render('Bursar/Payments/Show'))->name('payments.show');
        Route::get('/credit-notes', fn () => Inertia::render('Bursar/CreditNotes/Index'))->name('credit-notes.index');
        Route::get('/credit-notes/new', fn () => Inertia::render('Bursar/CreditNotes/Create'))->name('credit-notes.create');
        Route::get('/reconciliation', fn () => Inertia::render('Bursar/Reconciliation'))->name('reconciliation');
    });

    // ── Shared ────────────────────────────────────────────────────────────────
    Route::get('/audit-logs', fn () => Inertia::render('Shared/AuditLogs'))->name('audit-logs');
    Route::get('/notifications', fn () => Inertia::render('Shared/Notifications'))->name('notifications');
    Route::get('/account', fn () => Inertia::render('Shared/Account'))->name('account');
});

// ─────────────────────────────────────────────────────────────────────────────
// SUPER ADMIN PLATFORM — Separate section (not school-scoped)
// ─────────────────────────────────────────────────────────────────────────────
Route::prefix('platform')->name('platform.')->group(function () {
    Route::get('/', fn () => Inertia::render('Dashboard/Index'))->name('dashboard');
    Route::get('/billing', fn () => Inertia::render('Platform/Billing'))->name('billing');
    Route::get('/tenants', fn () => Inertia::render('Platform/Tenants/Index'))->name('tenants.index');
    Route::get('/tenants/{id}', fn () => Inertia::render('Platform/Tenants/Show'))->name('tenants.show');
    Route::get('/audit-logs', fn () => Inertia::render('Platform/AuditLogs'))->name('audit-logs');
});

// ─────────────────────────────────────────────────────────────────────────────
// PREVIEW / DEMO — bypass tenant resolution (dev only)
// ─────────────────────────────────────────────────────────────────────────────
Route::prefix('preview')->name('preview.')->group(function () {
    Route::get('/', fn () => Inertia::render('Dashboard/Home'))->name('dashboard');
    Route::get('/profile', fn () => Inertia::render('UserProfiles'))->name('profile');
    Route::get('/calendar', fn () => Inertia::render('Calendar'))->name('calendar');
    Route::get('/blank', fn () => Inertia::render('Blank'))->name('blank');
    Route::get('/form-elements', fn () => Inertia::render('Forms/FormElements'))->name('forms');
    Route::get('/basic-tables', fn () => Inertia::render('Tables/BasicTables'))->name('tables');
    Route::get('/signin', fn () => Inertia::render('AuthPages/SignIn'))->name('signin');
    Route::get('/signup', fn () => Inertia::render('AuthPages/SignUp'))->name('signup');
});

Route::fallback(function () {
    return Inertia::render('NotFound')->toResponse(request())->setStatusCode(404);
});
