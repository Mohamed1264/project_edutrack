<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Room;
class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Room::insert([
            [
                'school_id'=>1,
                'room_name'=>'Salle INFO'
            ], 
            [
                'school_id'=>1,
                'room_name'=>'Salle 1'
            ],
            [
                'school_id'=>1,
                'room_name'=>'Salle 2'
            ],
            [
                'school_id'=>1,
                'room_name'=>'Salle 3'
            ],
            [
                'school_id'=>1,
                'room_name'=>'Salle 4'
            ],
            [
                'school_id'=>1,
                'room_name'=>'Salle 5'
            ],

        ]);
    }
}
