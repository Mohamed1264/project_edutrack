<?php

namespace Database\Seeders;

use App\Models\TermType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TermTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TermType::insert([
            ['term_type'=>'Hybride'],
            ['term_type'=>'Online'],
            ['term_type'=>'In-person'],
        ]);
    }
}
