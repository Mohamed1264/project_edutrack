<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ClassSession;
use App\Models\School;
use App\Models\Schedule;

class ClassSessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
           

            ClassSession::create([
                'school_id' => 1,
                'schedule_id' => 1,
                'session_date' => now()->addDay()->toDateString(),
            ]);
        
    }
}
