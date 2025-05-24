<?php

namespace Database\Seeders;

use App\Models\TimeSlotType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TimeSlotTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = ['Morning','Afternoon','Evening'];
        foreach($types as $type){
            TimeSlotType::create([
                'time_slot_type'=>$type
            ]);
        }
    }
}
