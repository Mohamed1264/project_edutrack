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
                'full_name'=>'Hamid Sanka',
                'birth_date'=>'1975-09-04',
                'gender'=>'Male',
                'email'=>'hamid.sanka@example.net',
                'user_key'=>'am002',
                'phone_number'=>'+1-650-434-6658 2',
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
              [
                'full_name'=>'Hafsa Bouhjar',
                'birth_date'=>'1984-04-10',
                'gender'=>'Female',
                'email'=>'bouhjar.hafsa@example.net',
                'user_key'=>'t0002',
                'phone_number'=>'(803) 212-4347	2',
                'role_id'=>3,
              ],
              [
                'full_name'=>'Lhniti Mohammed',
                'birth_date'=>'1980-04-10',
                'gender'=>'Male',
                'email'=>'lhniti.mohammed@example.net',
                'user_key'=>'t0003',
                'phone_number'=>'1-317-374-7590	4',
                'role_id'=>3,
              ],
              [
                'full_name'=>'Hansali Chaimae',
                'birth_date'=>'1994-04-10',
                'gender'=>'Female',
                'email'=>'hansali.chaimae@example.net',
                'user_key'=>'t0004',
                'phone_number'=>'+1-251-243-6077 3',
                'role_id'=>3,
              ],
              [
                'full_name'=>'Ayoub Fikry',
                'birth_date'=>'2004-10-22',
                'gender'=>'Male',
                'email'=>'fikry.ayoub@example.net',
                'user_key'=>'s0001',
                'phone_number'=>'+1 (917) 327-2492	3',
                'role_id'=>4,
              ],
              [
                'full_name'=>'Chaimae Messo',
                'birth_date'=>'2004-05-02',
                'gender'=>'Female',
                'email'=>'chaimae.messo@example.net',
                'user_key'=>'s0002',
                'phone_number'=>'+1-239-669-0019 3',
                'role_id'=>4,
              ],
              [
                'full_name'=>'Mustapha Arab',
                'birth_date'=>'2002-01-01',
                'gender'=>'Male',
                'email'=>'arab.mustapha@example.net',
                'user_key'=>'s0003',
                'phone_number'=>'+1 (917) 327-2490	3',
                'role_id'=>4,
              ],
              [
                'full_name'=>'Ouhmad Mohammed',
                'birth_date'=>'2004-10-02',
                'gender'=>'Male',
                'email'=>'ouhmad.mohammed@example.net',
                'user_key'=>'s0004',
                'phone_number'=>'+1 (917) 227-2492	3',
                'role_id'=>4,
              ],

            ]);
    }
}
