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
        // Rename school_user to memberships
        Schema::rename('school_user', 'memberships');

        Schema::table('memberships', function (Blueprint $table) {
            $table->timestamp('last_accessed_at')->nullable()->after('status');
        });

        Schema::table('schools', function (Blueprint $table) {
            // Add address and contact fields for onboarding step 2 if they don't exist
            if (!Schema::hasColumn('schools', 'address')) {
                $table->text('address')->nullable()->after('location');
            }
            if (!Schema::hasColumn('schools', 'contact_email')) {
                $table->string('contact_email')->nullable()->after('address');
            }
            if (!Schema::hasColumn('schools', 'contact_phone')) {
                $table->string('contact_phone')->nullable()->after('contact_email');
            }
            if (!Schema::hasColumn('schools', 'logo_path')) {
                $table->string('logo_path')->nullable()->after('contact_phone');
            }
        });
    }

    public function down(): void
    {
        Schema::table('schools', function (Blueprint $table) {
            $table->dropColumn(['address', 'contact_email', 'contact_phone', 'logo_path']);
        });

        Schema::table('memberships', function (Blueprint $table) {
            $table->dropColumn('last_accessed_at');
        });

        Schema::rename('memberships', 'school_user');
    }
};
