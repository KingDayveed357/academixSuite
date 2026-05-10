<?php

namespace App\Services;

use App\Models\School;

class PlanService
{
    /**
     * Check if a school has access to a specific feature.
     */
    public function can(School $school, string $feature): bool
    {
        $plan = $school->plan ?? 'free';
        $features = config("plans.{$plan}", config('plans.free'));

        return (bool) ($features[$feature] ?? false);
    }

    /**
     * Check if student limit has been reached.
     */
    public function studentLimitReached(School $school): bool
    {
        if (! $school->plan_limits_enforced) {
            return false;
        }

        $plan = $school->plan ?? 'free';
        $limit = config("plans.{$plan}.max_students", 50);

        if ($limit === -1) {
            return false;
        }

        return $school->students()->count() >= $limit;
    }

    /**
     * Check if student limit is nearing (80%).
     */
    public function studentLimitWarning(School $school): bool
    {
        if (! $school->plan_limits_enforced) {
            return false;
        }

        $plan = $school->plan ?? 'free';
        $limit = config("plans.{$plan}.max_students", 50);

        if ($limit === -1) {
            return false;
        }

        $count = $school->students()->count();
        
        return $count >= ($limit * 0.8) && $count < $limit;
    }

    /**
     * Get the current plan details for a school.
     */
    public function currentPlan(School $school): array
    {
        $planName = $school->plan ?? 'free';
        return array_merge(
            ['name' => $planName],
            config("plans.{$planName}", config('plans.free'))
        );
    }
}
