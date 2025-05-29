<?php

namespace Database\Seeders;

use App\Models\Term;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TermSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Term::insert([
            [
                'school_id'=>1,
                'school_year_id'=>1,
                'term_type_id'=>1,
                'term_name'=>'Term 1',
                'start_date'=>'2024-09-05',
                'end_date'=>'2025-01-10',
                'is_active'=>false,
            ],
            [
                'school_id'=>1,
                'school_year_id'=>1,
                'term_type_id'=>1,
                'term_name'=>'Term 2',
                'start_date'=>'2024-01-10',
                'end_date'=>'2025-07-10',
                'is_active'=>true,
            ],

        ]);
    }
}
