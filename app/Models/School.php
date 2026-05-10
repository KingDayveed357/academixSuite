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
        'address',
        'contact_email',
        'contact_phone',
        'logo_path',
        'plan',
        'trial_ends_at',
        'plan_limits_enforced',
        'first_class_created_at',
        'first_student_added_at',
        'first_payment_recorded_at',
        'first_report_exported_at',
    ];

    protected $casts = [
        'onboarding_completed'      => 'boolean',
        'plan_limits_enforced'      => 'boolean',
        'trial_ends_at'             => 'datetime',
        'first_class_created_at'    => 'datetime',
        'first_student_added_at'    => 'datetime',
        'first_payment_recorded_at' => 'datetime',
        'first_report_exported_at'  => 'datetime',
    ];

    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    public function staff(): HasMany
    {
        return $this->hasMany(Membership::class); // In this app, staff = memberships
    }

    public static function tenantBaseHost(): string
    {
        return (string) (parse_url((string) config('app.url'), PHP_URL_HOST) ?: 'academixsuite.test');
    }

    public static function tenantBasePort(): ?int
    {
        $port = parse_url((string) config('app.url'), PHP_URL_PORT);

        return is_int($port) ? $port : null;
    }

    public static function tenantDomainForSlug(string $slug): string
    {
        return $slug . '.' . static::tenantBaseHost();
    }

    public function tenantUrl(string $path = ''): string
    {
        $path = '/' . ltrim($path, '/');
        $scheme = (string) (parse_url((string) config('app.url'), PHP_URL_SCHEME) ?: 'http');
        $port = static::tenantBasePort();
        $portSuffix = $port ? ':' . $port : '';

        // Enforce Subdomain-based routing ({slug}.academixsuite.com/dashboard)
        // This ensures tenant isolation and follows the requested production-grade strategy.
        $host = $this->domain ?: static::tenantDomainForSlug($this->slug);

        return $scheme . '://' . $host . $portSuffix . $path;
    }

    public function memberships(): HasMany
    {
        return $this->hasMany(Membership::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'memberships')
            ->withPivot(['role', 'staff_id', 'status', 'last_accessed_at'])
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

        $lastMembership = Membership::withoutGlobalScopes()
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
