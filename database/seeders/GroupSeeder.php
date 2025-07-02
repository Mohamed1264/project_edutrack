<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\Auth;

use Illuminate\Database\Seeder;
use App\Models\Group;
use App\Models\SchoolStructureInstance;

class GroupSeeder extends Seeder
{
    public function run(): void
    {
        // Get all school_structure_instance IDs that already have a group
        $usedInstanceIds = Group::pluck('school_structure_instance_id')->toArray();

        // Get structure instances that don't have a group yet
        $availableInstances = SchoolStructureInstance::whereNotIn('id', $usedInstanceIds)->get();


        foreach ($availableInstances as $instance) {
            Group::create([
                'school_structure_instance_id' => $instance->id,
                'type' => 'regular ' ,
                'school_id' => $instance->school_id
            ]);

           
        }

        $this->command->info('Groups seeded for available school structure instances.');
    }
}
