<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('schools', function (Blueprint $table) {
            $table->string('plan')->default('free')->after('status'); // 'free' | 'growth' | 'school'
            $table->timestamp('trial_ends_at')->nullable()->after('plan');
            $table->boolean('plan_limits_enforced')->default(true)->after('trial_ends_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('schools', function (Blueprint $table) {
            $table->dropColumn(['plan', 'trial_ends_at', 'plan_limits_enforced']);
        });
    }
};
