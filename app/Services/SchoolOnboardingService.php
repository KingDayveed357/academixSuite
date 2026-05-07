<?php

namespace App\Services;

use App\Enums\Role;
use App\Models\School;
use App\Models\SchoolUser;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SchoolOnboardingService
{
    public function onboard(array $data): array
    {
        return DB::transaction(function () use ($data): array {
            $domain = School::tenantDomainForSlug($data['slug']);

            $school = School::create([
                'name'     => $data['school_name'],
                'slug'     => $data['slug'],
                'domain'   => $domain,
                'location' => $data['location'] ?? null,
                'status'   => 'active',
            ]);

            $user = User::create([
                'name'     => $data['name'],
                'email'    => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            // Generate PREFIX-0001 style staff_id for the owner
            $staffId = $school->generateStaffId();

            SchoolUser::withoutGlobalScopes()->create([
                'school_id' => $school->id,
                'user_id'   => $user->id,
                'role'      => Role::SCHOOL_OWNER->value,
                'staff_id'  => $staffId,
                'status'    => 'active',
            ]);

            return compact('school', 'user', 'staffId');
        });
    }

    /**
     * Save a batch of onboarding settings for a school.
     */
    public function saveSettings(School $school, array $settings): void
    {
        foreach ($settings as $key => $value) {
            $school->onboardingSettings()->updateOrCreate(
                ['school_id' => $school->id, 'key' => $key],
                ['value'     => $value]
            );
        }
    }

    /**
     * Mark onboarding as complete.
     */
    public function complete(School $school): void
    {
        $school->update(['onboarding_completed' => true]);
    }
}
