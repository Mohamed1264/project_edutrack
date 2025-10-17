<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
              'full_name'=>'Monir Ahmadi',
              'birth_date'=>'1987-10-01',
              'gender'=>'Male',
              'email'=>'kellen83@example.org',
              'user_key'=>'admin',
              'phone_number'=>'+1-657-765-0346	1',
              'role_id'=>1,
            ],
            [
                'full_name'=>'Fatima Jilali',
                'birth_date'=>'1975-09-04',
                'gender'=>'Female',
                'email'=>'smitham.ross@example.net',
                'user_key'=>'am001',
                'phone_number'=>'(575) 542-3392	4',
                'role_id'=>2,
            ],
              [
                'full_name'=>'Daaif Abdellah',
                'birth_date'=>'1984-04-10',
                'gender'=>'Male',
                'email'=>'daaif.abdellah@example.net',
                'user_key'=>'t0001',
                'phone_number'=>'(248) 701-2604	4',
                'role_id'=>3,
              ],

            ]);
    }
}
