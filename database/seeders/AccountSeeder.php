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
                'user_key'=>'am002',
                'password'=>Hash::make('password'),
                'original_password'=>Hash::make('password'),
                'teacher_type_id'=>null
            ],  
            [
                'school_key'=>'ISTA',
                'user_key'=>'s0001',
                'password'=>Hash::make('password'),
                'original_password'=>Hash::make('password'),
                'teacher_type_id'=>null
            ],  
            [
                'school_key'=>'ISTA',
                'user_key'=>'s0002',
                'password'=>Hash::make('password'),
                'original_password'=>Hash::make('password'),
                'teacher_type_id'=>null
            ],  
            [
                'school_key'=>'ISTA',
                'user_key'=>'s0003',
                'password'=>Hash::make('password'),
                'original_password'=>Hash::make('password'),
                'teacher_type_id'=>null
            ],  
            [
                'school_key'=>'ISTA',
                'user_key'=>'s0004',
                'password'=>Hash::make('password'),
                'original_password'=>Hash::make('password'),
                'teacher_type_id'=>null
            ],  
            [
                'school_key'=>'ISTA',
                'user_key'=>'t0001',
                'password'=>Hash::make('password'),
                'original_password'=>Hash::make('password'),
                'teacher_type_id'=>1
            ],  
            [
                'school_key'=>'ISTA',
                'user_key'=>'t0002',
                'password'=>Hash::make('password'),
                'original_password'=>Hash::make('password'),
                'teacher_type_id'=>1
            ],
            [
                'school_key'=>'ISTA',
                'user_key'=>'t0003',
                'password'=>Hash::make('password'),
                'original_password'=>Hash::make('password'),
                'teacher_type_id'=>1
            ],
            [
                'school_key'=>'ISTA',
                'user_key'=>'t0004',
                'password'=>Hash::make('password'),
                'original_password'=>Hash::make('password'),
                'teacher_type_id'=>1
            ],


        ]);
    }
}
