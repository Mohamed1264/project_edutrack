<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Schedule;
use App\Models\School;
use App\Models\Room;
use App\Models\Account;
use App\Models\Group;
use App\Models\TimeSlot;
use App\Models\WeekDay;
use App\Models\Term;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $school = School::find(1);
        if (!$school) {
            $this->command->info('No school with id 1 found. Skipping Schedule seeding.');
            return;
        }

        $term = $school->terms()->first();
        $group = $school->groups()->first();
        $timeSlot = TimeSlot::first();
        $weekday = WeekDay::first();
        $room = $school->rooms()->first();
        $teacher = Account::where('school_key', $school->school_key)->first();

        if (!$term || !$group || !$timeSlot || !$weekday) {
            $this->command->info('Missing related records (term/group/time slot/weekday). Skipping Schedule seeding.');
            return;
        }

        // Create a schedule entry so class sessions can reference it
        Schedule::create([
            'school_id' => $school->id,
            'group_id' => $group->id,
            'room_id' => $room ? $room->id : null,
            'teacher_id' => $teacher ? $teacher->id : null,
            'time_slot_id' => $timeSlot->id,
            'day_id' => $weekday->id,
            'status' => 'active',
            'term_id' => $term->id,
            'version_start_date' => now(),
            'type' => 'Presential',
        ]);

        $this->command->info('Inserted a default schedule for school 1.');
    }

}
