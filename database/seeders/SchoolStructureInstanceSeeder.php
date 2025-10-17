<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SchoolStructureInstanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('school_structure_instances')->insert([
            [
                 'school_id'=>1,
                 'parent_id'=>null,
                 'school_structure_unit_id'=>1,
                 'name'=>'Technicien specialise'
            ],
            [
                'school_id'=>1,
                'parent_id'=>null,
                'school_structure_unit_id'=>1,
                'name'=>'Technicien'
           ],
            [
                    'school_id'=>1,
                    'parent_id'=>null,
                    'school_structure_unit_id'=>1,
                    'name'=>'Qualifie'
            ],
            [
                'school_id'=>1,
                'parent_id'=>1,
                'school_structure_unit_id'=>2,
                'name'=>'developpement digital'
        ],
 [
                'school_id' => 1,
                'parent_id' => 1,
                'school_structure_unit_id' => 2,
                'name' => 'Gestion des Entreprises',
            ],
            [
                'school_id' => 1,
                'parent_id' => 1,
                'school_structure_unit_id' => 2,
                'name' => 'Génie Climatique',
            ],

        ]);
    }
}
