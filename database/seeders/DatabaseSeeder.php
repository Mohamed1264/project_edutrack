<?php

namespace Database\Seeders;


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
use Database\Seeders\TimeSlotsModeSeeder;
use Database\Seeders\TimeSlotSeeder;
use Database\Seeders\RoomSeeder;
use Database\Seeders\SchoolYearSeeder;
use Database\Seeders\TermTypeSeeder;
use Database\Seeders\TermSeeder;
use Database\Seeders\SchoolWorkingDaySeeder;

use Database\Seeders\GroupSeeder;
use Database\Seeders\JustificationReasonSeeder;
use Database\Seeders\SchoolJustificationReasonSeeder;
use Database\Seeders\ScheduleSeeder;
use Database\Seeders\ClassSessionSeeder;
use Database\Seeders\AbsenceSeeder;
use Database\Seeders\AbsenceJustificationSeeder;


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
            TimeSlotsModeSeeder::class,
            TimeSlotSeeder::class,
            RoomSeeder::class,
            SchoolYearSeeder::class,
            TermTypeSeeder::class,
            TermSeeder::class,
            SchoolWorkingDaySeeder::class,
            GroupSeeder::class,
            JustificationReasonSeeder::class,
            SchoolJustificationReasonSeeder::class,
            ScheduleSeeder::class,
            ClassSessionSeeder::class,
            AbsenceSeeder::class,
            AbsenceJustificationSeeder::class,
            PathStatusTypeSeeder::class
        ]);
    }
}
