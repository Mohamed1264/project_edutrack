<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Absence;

class AbsenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Absence::create([
            'school_id'      => 1,
            'student_id'     => 1,
            'session_id'     => 1,
            'term_id'        => 1,
            'justification_id' => null, // or a valid justification id
            'type'           => 'Absent', // or 'Late', 'Quit', etc.
            'is_justified'   => false,
        ]);

        Absence::create([
            'school_id'      => 1,
            'student_id'     => 2,
            'session_id'     => 1,
            'term_id'        => 1,
            'justification_id' => null,
            'type'           => 'Late',
            'is_justified'   => true,
        ]);

        // Add more as needed...
    }
}
