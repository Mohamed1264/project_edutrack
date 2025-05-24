<?php

namespace Database\Seeders;

use App\Models\StructureUnit;
use App\Models\User;
use Database\Factories\SchoolFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\PlatfromAdminSeeder;
use Database\Seeders\PlatfromRoleSeeder;
use Database\Seeders\SchoolTypeSeeder;
use Database\Seeders\SchoolSeeder;
use Database\Seeders\TeacherTypeSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\AccountSeeder;
use Database\Seeders\StructureUnitSeeder;
use Database\Seeders\SchoolStructureUnitsSeeder;
use Database\Seeders\SchoolStructureInstanceSeeder;
use Database\Seeders\WeekDaySeeder;
use Database\Seeders\TimeSlotTypeSeeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            PlatfromAdminSeeder::class,
            PlatfromRoleSeeder::class,
            SchoolTypeSeeder::class,
            SchoolSeeder::class,
            StructureUnitSeeder::class,
            SchoolStructureUnitsSeeder::class,
            SchoolStructureInstanceSeeder::class,
            TeacherTypeSeeder::class,
            UserSeeder::class,
            AccountSeeder::class,
            WeekDaySeeder::class,
            TimeSlotTypeSeeder::class,
        ]);
    }
}
