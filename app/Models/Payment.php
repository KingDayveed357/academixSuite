<?php

namespace App\Models;

use App\Models\Concerns\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use HasFactory, BelongsToSchool, SoftDeletes;

    protected $fillable = ['school_id', 'student_id', 'reference_number', 'amount', 'currency', 'status', 'received_at', 'voided_at', 'void_reason', 'created_by'];

    protected function casts(): array
    {
        return ['received_at' => 'datetime', 'voided_at' => 'datetime'];
    }
}
