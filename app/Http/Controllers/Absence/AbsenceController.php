<?php

namespace App\Http\Controllers\Absence;

use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\Schedule;
use App\Models\StudentPath;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AbsenceController extends Controller
{
    public function create($id) {
        // Find the session (schedule)
        $session = Schedule::with(['group.structureInstance', 'time_slot', 'day', 'room', 'teacher'])->findOrFail($id);
        $group = $session->group;
        // Get active students in the group
        $activeStudentPaths = $group->activeStudents()->with('student.user')->get();
        $students = $activeStudentPaths->map(function($path) {
            $account = $path->student;
            return [
                'id' => $account->id,
                'full_name' => $account->user->full_name ?? null,
                'user_key' => $account->user_key,
                'email' => $account->user->email ?? null,
                // Add more fields as needed
            ];
        });
        return Inertia::render('Teacher/TakeAbsence', [
            'session' => [
                'id' => $session->id,
                'day' => $session->day->day_name ?? null,
                'start_time' => $session->time_slot->start_time ?? null,
                'end_time' => $session->time_slot->end_time ?? null,
                'room' => $session->room->room_name ?? null,
                'teacher' => $session->teacher->user->full_name ?? null,
                'group' => $group->structureInstance->name ?? null,
            ],
            'students' => $students,
            'group' => [
                'id' => $group->id,
                'name' => $group->structureInstance->name ?? null,
            ],
        ]);
    }
}
