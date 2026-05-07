<?php

namespace App\Models;

use App\Models\Concerns\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditNote extends Model
{
    use HasFactory, BelongsToSchool;

    protected $fillable = ['school_id', 'student_id', 'payment_id', 'amount', 'reason', 'status'];
}
