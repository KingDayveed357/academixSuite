<?php

namespace App\Models;

use App\Models\Concerns\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentAllocation extends Model
{
    use HasFactory, BelongsToSchool;

    protected $fillable = ['school_id', 'payment_id', 'student_fee_id', 'amount'];
}
