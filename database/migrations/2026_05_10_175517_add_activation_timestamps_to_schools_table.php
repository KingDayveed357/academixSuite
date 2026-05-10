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
            $table->timestamp('first_class_created_at')->nullable();
            $table->timestamp('first_student_added_at')->nullable()->after('first_class_created_at');
            $table->timestamp('first_payment_recorded_at')->nullable()->after('first_student_added_at');
            $table->timestamp('first_report_exported_at')->nullable()->after('first_payment_recorded_at');
        });
    }

    public function down(): void
    {
        Schema::table('schools', function (Blueprint $table) {
            $table->dropColumn([
                'first_class_created_at',
                'first_student_added_at',
                'first_payment_recorded_at',
                'first_report_exported_at'
            ]);
        });
    }
};
