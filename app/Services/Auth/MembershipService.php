<?php

namespace App\Services\Auth;

use App\Models\Membership;
use App\Models\User;
use Illuminate\Support\Collection;

class MembershipService
{
    /**
     * Get all active memberships for a user.
     */
    public function getActiveMemberships(User $user): Collection
    {
        return $user->schoolMemberships()
            ->where('status', 'active')
            ->with('school')
            ->get();
    }

    /**
     * Get the "best" membership to auto-select.
     * Priority: Last accessed, or first created.
     */
    public function getPrimaryMembership(User $user): ?Membership
    {
        return $user->schoolMemberships()
            ->where('status', 'active')
            ->orderByDesc('last_accessed_at')
            ->orderBy('id')
            ->first();
    }
}
