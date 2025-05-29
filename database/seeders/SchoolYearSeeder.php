<?php

namespace Database\Seeders;

use App\Models\SchoolYear;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SchoolYearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SchoolYear::create([
            'school_id'=>1,
            'name'=>'2024/2025',
            'start_date'=>'2024-09-05',
            'end_date'=>'2025-07-10',
            'is_active'=>1,
        ]);
    }
}
