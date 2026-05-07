<?php

namespace App\Models;

use App\Models\Concerns\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolUser extends Model
{
    use HasFactory, BelongsToSchool;

    protected $table = 'school_user';

    protected $fillable = [
        'school_id',
        'user_id',
        'role',
        'staff_id',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }
}
