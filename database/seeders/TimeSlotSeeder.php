<?php

namespace Database\Seeders;

use App\Models\TimeSlot;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TimeSlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TimeSlot::insert([
            [
                'school_id'=>1,
                'mode_id'=>1,
                'type_id'=>1,
                'start_time'=>'08:30:00',
                'end_time'=>'11:00:00',
                'is_active'=>1
            ],
            [
                'school_id'=>1,
                'mode_id'=>1,
                'type_id'=>1,
                'start_time'=>'11:00:00',
                'end_time'=>'13:30:00',
                'is_active'=>1
            ],
            [
                'school_id'=>1,
                'mode_id'=>1,
                'type_id'=>2,
                'start_time'=>'13:30:00',
                'end_time'=>'16:00:00',
                'is_active'=>1
            ],
            [
                'school_id'=>1,
                'mode_id'=>1,
                'type_id'=>2,
                'start_time'=>'16:00:00',
                'end_time'=>'18:30:00',
                'is_active'=>1
            ],
            [
                'school_id'=>1,
                'mode_id'=>1,
                'type_id'=>3,
                'start_time'=>'19:00:00',
                'end_time'=>'21:30:00',
                'is_active'=>1
            ],
           
        ]);
    }
}
