<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\PaymentAllocation;
use App\Models\PaymentLog;
use App\Models\PaymentRequest;
use App\Models\StudentFee;
use Illuminate\Support\Facades\DB;

class PaymentService
{
    public function receive(array $data): Payment
    {
        return DB::transaction(function () use ($data): Payment {
            $hash = hash('sha256', json_encode($data));
            $idempotency = PaymentRequest::firstOrCreate(
                ['reference_number' => $data['reference_number']],
                ['payload_hash' => $hash, 'processed_at' => now()]
            );

            if (! $idempotency->wasRecentlyCreated) {
                return Payment::where('reference_number', $data['reference_number'])->firstOrFail();
            }

            $payment = Payment::create($data + ['status' => 'posted']);
            $remaining = (float) $payment->amount;

            $fees = StudentFee::where('student_id', $payment->student_id)
                ->orderBy('created_at')
                ->lockForUpdate()
                ->get();

            foreach ($fees as $fee) {
                if ($remaining <= 0) {
                    break;
                }

                $allocated = PaymentAllocation::where('student_fee_id', $fee->id)->sum('amount');
                $outstanding = (float) $fee->amount - (float) $allocated;

                if ($outstanding <= 0) {
                    continue;
                }

                $amount = min($outstanding, $remaining);
                PaymentAllocation::create([
                    'school_id' => $payment->school_id,
                    'payment_id' => $payment->id,
                    'student_fee_id' => $fee->id,
                    'amount' => $amount,
                ]);

                $remaining -= $amount;
            }

            PaymentLog::create([
                'school_id' => $payment->school_id,
                'payment_id' => $payment->id,
                'event' => 'payment_posted',
                'payload' => ['remaining_unallocated' => $remaining],
                'performed_by' => $payment->created_by,
            ]);

            return $payment;
        });
    }
}
