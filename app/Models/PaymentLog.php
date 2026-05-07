<?php

namespace App\Models;

use App\Models\Concerns\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentLog extends Model
{
    use HasFactory, BelongsToSchool;

    protected $fillable = ['school_id', 'payment_id', 'event', 'payload', 'performed_by'];

    protected function casts(): array
    {
        return ['payload' => 'array'];
    }
}
