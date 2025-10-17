<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('accounts')->insert([
            [
                'school_key'=>'ISTA',
                'user_key'=>'admin',
                'password'=>Hash::make('password'),
                'original_password'=>'password',
                'teacher_type_id'=>null
            ],
            [
                'school_key'=>'ISTA',
                'user_key'=>'am001',
                'password'=>Hash::make('password'),
                'original_password'=>'password',
                'teacher_type_id'=>null
            ],  
            [
                'school_key'=>'ISTA',
                'user_key'=>'t0001',
                'password'=>Hash::make('password'),
                'original_password'=>Hash::make('password'),
                'teacher_type_id'=>1
            ],  

        ]);
    }
}
