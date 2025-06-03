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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->constrained('accounts')->onDelete('cascade');
            $table->foreignId('group_id')->constrained('groups')->onDelete('cascade');
            $table->foreignId('room_id')->nullable()->constrained('rooms')->onDelete('cascade');
            $table->foreignId('time_slot_id')->constrained('time_slots')->onDelete('cascade');
            $table->foreignId('day_id')->constrained('week_days')->onDelete('cascade');
            $table->foreignId('replace_session_id')->nullable()->constrained('schedules')->onDelete('cascade');
            $table->foreignId('school_id')->constrained('schools')->onDelete('cascade');
            $table->foreignId('term_id')->constrained('terms')->onDelete('cascade');
            $table->enum('status',['Active','OverLapped','Archived','Temporary','Canceled']);
            $table->enum('type',['Presential','Remotely']);
            $table->boolean('is_temporary')->default(false);
            $table->date('version_start_date');
            $table->date('version_end_date')->nullable();
            $table->date('temporary_from')->nullable();
            $table->date('temporary_to')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
