<?php

namespace Database\Seeders;

use App\Models\PlatfromAdmin;
use App\Models\PlatfromRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlatfromRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'Admin',
            'Absence Manager',
            'Teacher',
            'Student',
        ];
        foreach($roles as $role){
            PlatfromRole::create([
                'role_name'=>$role,
                'created_by'=>PlatfromAdmin::inRandomOrder()->first()->id
            ]);
        };
        
    }
}
