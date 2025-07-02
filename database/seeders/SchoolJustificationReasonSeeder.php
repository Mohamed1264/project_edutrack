<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SchoolJustificationReason;
use App\Models\School;
use App\Models\JustificationReason;

class SchoolJustificationReasonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $school = School::first();
        $reasons = JustificationReason::all();

        if ($school && $reasons->count() > 0) {
            foreach ($reasons as $reason) {
                SchoolJustificationReason::firstOrCreate([
                    'school_id' => $school->id,
                    'global_reason_id' => $reason->id,
                ], [
                    'name' => $reason->name,
                    'custom_note' => null,
                    'is_active' => true,
                ]);
            }
        }
    }
}
