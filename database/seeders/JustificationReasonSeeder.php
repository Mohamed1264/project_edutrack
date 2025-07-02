<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\JustificationReason;

class JustificationReasonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reasons = [
            [
                'name' => 'Medical Appointment',
                'reason_type' => 'health',
                'description' => 'Student has a medical appointment',
                'is_active' => true,
            ],
            [
                'name' => 'Family Emergency',
                'reason_type' => 'family',
                'description' => 'Family emergency requiring immediate attention',
                'is_active' => true,
            ],
            [
                'name' => 'Religious Holiday',
                'reason_type' => 'administrative',
                'description' => 'Religious holiday observance',
                'is_active' => true,
            ],
            [
                'name' => 'School Event',
                'reason_type' => 'administrative',
                'description' => 'Official school event or activity',
                'is_active' => true,
            ],
            [
                'name' => 'Transportation Issue',
                'reason_type' => 'other',
                'description' => 'Transportation problems preventing attendance',
                'is_active' => true,
            ],
        ];

        foreach ($reasons as $reason) {
            JustificationReason::firstOrCreate(['name' => $reason['name']], $reason);
        }
    }
}
