<?php

namespace App\Models;

use App\Models\SchoolUser;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    public function schoolMemberships()
    {
        return $this->hasMany(SchoolUser::class);
    }

    public function schools()
    {
        return $this->belongsToMany(School::class, 'school_user')
            ->withPivot(['role', 'staff_id', 'status'])
            ->withTimestamps();
    }

    /**
     * Get membership for a specific school.
     */
    public function membershipFor(int $schoolId): ?SchoolUser
    {
        return $this->schoolMemberships()->where('school_id', $schoolId)->first();
    }

    /**
     * Get membership by staff_id within a specific school.
     */
    public static function findByStaffId(string $staffId, int $schoolId): ?self
    {
        $membership = SchoolUser::withoutGlobalScopes()
            ->where('staff_id', $staffId)
            ->where('school_id', $schoolId)
            ->first();

        return $membership ? self::find($membership->user_id) : null;
    }
}
