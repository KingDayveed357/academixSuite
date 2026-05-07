<?php

namespace App\Models\Concerns;

use App\Support\Tenancy\TenantContext;
use Illuminate\Database\Eloquent\Builder;

trait BelongsToSchool
{
    protected static function bootBelongsToSchool(): void
    {
        static::creating(function ($model): void {
            if (! $model->school_id && app(TenantContext::class)->id()) {
                $model->school_id = app(TenantContext::class)->id();
            }
        });

        static::addGlobalScope('tenant', function (Builder $builder): void {
            $tenantId = app(TenantContext::class)->id();
            if ($tenantId) {
                $builder->where($builder->getModel()->getTable().'.school_id', $tenantId);
            }
        });
    }
}
