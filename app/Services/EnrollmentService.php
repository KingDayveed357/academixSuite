<?php

namespace App\Services;

use App\Models\Enrollment;

class EnrollmentService
{
    public function promote(array $data): Enrollment
    {
        Enrollment::where('student_id', $data['student_id'])
            ->where('status', 'active')
            ->update(['status' => 'completed', 'ends_at' => now()->toDateString()]);

        return Enrollment::create($data + ['status' => 'active']);
    }
}
