<?php

namespace App\Support\Tenancy;

use App\Models\School;

class TenantContext
{
    private ?School $tenant = null;

    public function set(?School $tenant): void
    {
        $this->tenant = $tenant;
    }

    public function get(): ?School
    {
        return $this->tenant;
    }

    public function id(): ?int
    {
        return $this->tenant?->id;
    }

    public function hasTenant(): bool
    {
        return $this->tenant !== null;
    }
}
