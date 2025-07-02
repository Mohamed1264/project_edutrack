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
        $school = School::first();
        $room = Room::first();
        $teacher = Account::first();
        $group = Group::first();
        $timeSlot = TimeSlot::first();
        $day = WeekDay::first();
        $term = Term::first();

        if ($school && $room && $teacher && $group && $timeSlot && $day && $term) {
            Schedule::create([
                'school_id' => $school->id,
                'room_id' => $room->id,
                'teacher_id' => $teacher->id,
                'group_id' => $group->id,
                'time_slot_id' => $timeSlot->id,
                'day_id' => $day->id,
                'status' => 'active',
                'temporary_from' => null,
                'temporary_to' => null,
                'term_id' => $term->id,
                'version_start_date' => now()->toDateString(),
                'version_end_date' => null,
                'is_temporary' => false,
                'type' => 'Presential',
            ]);
        }
    }
}
