<?php

namespace App\Jobs;

use App\Models\StudentFee;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ReconciliationJob implements ShouldQueue
{
    use Queueable;

    public function handle(): void
    {
        StudentFee::query()->chunkById(200, function ($fees): void {
            foreach ($fees as $fee) {
                $allocated = $fee->newQuery()->getQuery()->from('payment_allocations')->where('student_fee_id', $fee->id)->sum('amount');
                $fee->status_cache = $allocated >= $fee->amount ? 'paid' : ($allocated > 0 ? 'partial' : 'unpaid');
                $fee->save();
            }
        });
    }
}
