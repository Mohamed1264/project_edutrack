<?php

namespace Database\Seeders;

use App\Models\SchoolWorkingDay;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SchoolWorkingDaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SchoolWorkingDay::insert([
            [
                'school_id'=>1,
                'day_id'=>1,
                'mode_id'=>1,
                'note'=> null
            ],
            [
                'school_id'=>1,
                'day_id'=>2,
                'mode_id'=>1,
                'note'=> null
            ],
            [
                'school_id'=>1,
                'day_id'=>3,
                'mode_id'=>1,
                'note'=> null
            ],
            [
                'school_id'=>1,
                'day_id'=>4,
                'mode_id'=>1,
                'note'=> null
            ],
            [
                'school_id'=>1,
                'day_id'=>5,
                'mode_id'=>1,
                'note'=> null
            ],
            [
                'school_id'=>1,
                'day_id'=>6,
                'mode_id'=>1,
                'note'=> null
            ],
        ]);
    }
}
