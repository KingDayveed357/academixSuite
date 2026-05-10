<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\Invitation;
use App\Models\Membership;
use App\Models\User;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class InvitationController extends Controller
{
    public function __construct(private readonly TenantContext $tenantContext) {}

    /**
     * Show the invitation form (for admin to invite new staff).
     */
    public function create()
    {
        $school = $this->tenantContext->get();
        abort_unless($school, 403);

        return Inertia::render('Staff/InviteStaff', [
            'roles' => [
                ['value' => Role::SCHOOL_ADMIN->value, 'label' => 'School Admin'],
                ['value' => Role::BURSAR->value,       'label' => 'Bursar'],
            ],
        ]);
    }

    /**
     * Admin sends an invitation.
     */
    public function store(Request $request)
    {
        $school = $this->tenantContext->get();
        abort_unless($school, 403);

        $data = $request->validate([
            'email' => ['required', 'email'],
            'role'  => ['required', 'in:school_admin,bursar'],
        ]);

        // Upsert: if invitation already exists for this email+school, refresh it
        Invitation::updateOrCreate(
            ['school_id' => $school->id, 'email' => $data['email']],
            [
                'role'       => $data['role'],
                'token'      => Str::random(48),
                'invited_by' => auth()->id(),
                'expires_at' => now()->addDays(7),
                'accepted_at' => null,
            ]
        );

        // In a real app, send a mail here
        // Mail::to($data['email'])->send(new StaffInvitationMail($invitation, $school));

        return back()->with('success', 'Invitation sent to ' . $data['email']);
    }

    /**
     * Show the invitation accept page (public — no auth required).
     */
    public function showAccept(string $token)
    {
        $invitation = Invitation::where('token', $token)
            ->whereNull('accepted_at')
            ->first();

        if (! $invitation || $invitation->isExpired()) {
            return Inertia::render('Auth/InvalidInvitation', [
                'message' => $invitation?->isExpired()
                    ? 'This invitation has expired. Please ask your administrator for a new one.'
                    : 'Invitation not found.',
            ]);
        }

        $existingUser = User::where('email', $invitation->email)->first();

        return Inertia::render('Auth/AcceptInvitation', [
            'token'        => $token,
            'email'        => $invitation->email,
            'role'         => $invitation->role,
            'school'       => $invitation->school()->select(['id', 'name', 'slug'])->first(),
            'isNewUser'    => ! $existingUser,
        ]);
    }

    /**
     * Process the invitation acceptance.
     */
    public function accept(Request $request, string $token)
    {
        $invitation = Invitation::where('token', $token)
            ->whereNull('accepted_at')
            ->firstOrFail();

        abort_if($invitation->isExpired(), 410, 'Invitation expired.');

        $data = $request->validate([
            'name'     => ['required_if:is_new_user,true', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $school = $invitation->school;

        $user = User::where('email', $invitation->email)->first();

        if (! $user) {
            // Case A: New user
            $user = User::create([
                'name'     => $data['name'],
                'email'    => $invitation->email,
                'password' => Hash::make($data['password']),
            ]);
        } else {
            // Case B: Existing user — just verify password
            if (! Hash::check($data['password'], $user->password)) {
                return back()->withErrors(['password' => 'Incorrect password.']);
            }
        }

        // Attach user to school
        $existingMembership = Membership::withoutGlobalScopes()
            ->where('school_id', $school->id)
            ->where('user_id', $user->id)
            ->first();

        if (! $existingMembership) {
            $staffId = $school->generateStaffId();

            Membership::withoutGlobalScopes()->create([
                'school_id' => $school->id,
                'user_id'   => $user->id,
                'role'      => $invitation->role,
                'staff_id'  => $staffId,
                'status'    => 'active',
            ]);
        }

        $invitation->update(['accepted_at' => now()]);

        auth()->login($user);
        $request->session()->put('tenant_id', $school->id);
        $request->session()->put('school_id', $school->id);
        $request->session()->put('membership_role', $invitation->role);

        return Inertia::location($school->tenantUrl($invitation->role === 'bursar' ? '/finance' : '/dashboard'));
    }
}
