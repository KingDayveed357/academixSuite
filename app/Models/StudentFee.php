<?php

namespace App\Models;

use App\Models\Concerns\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentFee extends Model
{
    use HasFactory, BelongsToSchool;

    protected $fillable = ['school_id', 'student_id', 'enrollment_id', 'fee_type_id', 'session_name', 'term_name', 'amount', 'status_cache'];
}
