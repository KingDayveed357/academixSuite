<?php

namespace App\Services;

use App\Models\StudentFee;

class FeeGenerationService
{
    public function createIfMissing(array $data): StudentFee
    {
        return StudentFee::firstOrCreate(
            [
                'school_id' => $data['school_id'],
                'student_id' => $data['student_id'],
                'enrollment_id' => $data['enrollment_id'],
                'fee_type_id' => $data['fee_type_id'],
                'session_name' => $data['session_name'],
                'term_name' => $data['term_name'],
            ],
            [
                'amount' => $data['amount'],
                'status_cache' => 'unpaid',
            ]
        );
    }
}
