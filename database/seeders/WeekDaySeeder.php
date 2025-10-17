<?php

namespace Database\Seeders;

use App\Models\WeekDay;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WeekDaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Traduction des jours de la semaine en français
        $days = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
        foreach($days as $day){
            WeekDay::create([
                'day_name' =>$day
            ]);
        }
    }
}
