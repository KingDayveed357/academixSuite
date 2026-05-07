<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Add staff_id, status, location to schools table
        Schema::table('schools', function (Blueprint $table): void {
            $table->string('location')->nullable()->after('domain');
            $table->boolean('onboarding_completed')->default(false)->after('status');
        });

        // Upgrade school_user pivot to a proper memberships table
        Schema::table('school_user', function (Blueprint $table): void {
            $table->string('staff_id')->nullable()->after('role');
            $table->string('status')->default('active')->after('staff_id'); // active | banned
            $table->unique(['school_id', 'staff_id'], 'uq_membership_staff_id');
        });

        // Onboarding settings per school
        Schema::create('onboarding_settings', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('school_id')->constrained()->cascadeOnDelete();
            $table->string('key');
            $table->text('value')->nullable();
            $table->timestamps();
            $table->unique(['school_id', 'key']);
        });

        // Invitations table
        Schema::create('invitations', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('school_id')->constrained()->cascadeOnDelete();
            $table->string('email');
            $table->string('role');
            $table->string('token', 64)->unique();
            $table->foreignId('invited_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
            $table->unique(['school_id', 'email'], 'uq_invitation_email_school');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invitations');
        Schema::dropIfExists('onboarding_settings');

        Schema::table('school_user', function (Blueprint $table): void {
            $table->dropUnique('uq_membership_staff_id');
            $table->dropColumn(['staff_id', 'status']);
        });

        Schema::table('schools', function (Blueprint $table): void {
            $table->dropColumn(['location', 'onboarding_completed']);
        });
    }
};
