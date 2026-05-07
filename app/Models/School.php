<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class School extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'domain',
        'location',
        'status',
        'onboarding_completed',
    ];

    protected $casts = [
        'onboarding_completed' => 'boolean',
    ];

    public static function tenantBaseHost(): string
    {
        return (string) (parse_url((string) config('app.url'), PHP_URL_HOST) ?: 'academixsuite.test');
    }

    public static function tenantDomainForSlug(string $slug): string
    {
        return $slug . '.' . static::tenantBaseHost();
    }

    public function tenantUrl(string $path = ''): string
    {
        $scheme = (string) (parse_url((string) config('app.url'), PHP_URL_SCHEME) ?: 'http');
        $host = $this->domain ?: static::tenantDomainForSlug($this->slug);
        $path = '/' . ltrim($path, '/');

        return $scheme . '://' . $host . $path;
    }

    public function memberships(): HasMany
    {
        return $this->hasMany(SchoolUser::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'school_user')
            ->withPivot(['role', 'staff_id', 'status'])
            ->withTimestamps();
    }

    public function onboardingSettings(): HasMany
    {
        return $this->hasMany(OnboardingSetting::class);
    }

    /**
     * Generate a sequential staff_id for this school.
     * Format: PREFIX-0001  (PREFIX = first 3 letters of slug uppercased)
     */
    public function generateStaffId(): string
    {
        $prefix = strtoupper(substr(preg_replace('/[^a-z]/i', '', $this->slug), 0, 4));

        $lastMembership = SchoolUser::withoutGlobalScopes()
            ->where('school_id', $this->id)
            ->whereNotNull('staff_id')
            ->orderByDesc('id')
            ->first();

        $nextNum = 1;
        if ($lastMembership && $lastMembership->staff_id) {
            // Extract number from "PREFIX-0042" → 42
            $parts = explode('-', $lastMembership->staff_id);
            $nextNum = ((int) end($parts)) + 1;
        }

        return $prefix . '-' . str_pad($nextNum, 4, '0', STR_PAD_LEFT);
    }
}
