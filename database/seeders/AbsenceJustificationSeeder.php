<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AbsenceJustification;
use App\Models\School;
use App\Models\Term;
use App\Models\SchoolJustificationReason;

class AbsenceJustificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $school = School::first();
        $term = Term::first();
        $justificationReason = SchoolJustificationReason::first();

            AbsenceJustification::create([
                'school_id' => $school->id,
                'term_id' => $term->id,
                'justification_reason_id' => $justificationReason->id,
                'justification_date' => now()->toDateString(),
            ]);
        
    }
}
