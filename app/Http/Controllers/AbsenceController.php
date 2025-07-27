<?php

namespace App\Http\Controllers;
use Carbon\Carbon;

use App\Models\Group;
use App\Models\Absence;
use App\Models\Schedule;
use App\Models\ClassSession;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AbsenceController extends Controller
{
    public function index($id)
    {
        $schedule = Schedule::where('id', $id)->firstOrFail();
    
        $group = Group::with(['structureInstance', 'activeStudents.student.user'])
            ->where('id', $schedule->group_id)
            ->firstOrFail();
    
        $students = $group->activeStudents->map(function ($path) {
            $account = $path->student;
            return [
                'id' => $account->id,
                'name' => $account->user->full_name ?? null,
                'user_key' => $account->user_key,
                'email' => $account->user->email ?? null,
            ];
        });
    
        // ✅ Pluck IDs correctly
        $studentIds = $students->pluck('id');
    
        // ✅ Fetch all absences for the students
        $absences = Absence::whereIn('student_id', $studentIds)
        ->where('is_justified', false)
        ->get();

        $groupData = [
            'id' => $group->id,
            'name' => $group->structureInstance->name ?? null,
            'students' => $students,
        ];
    
        return Inertia::render('Teacher/TakeAbsence', [
            'initialGroup' => $groupData,
            'schedule' => $schedule,
            'absence' => $absences,
        ]);
    }
    

public function store(Request $request)
{
    $groupId = $request->input('group_id');
    $absences = $request->input('absences');
    $schedule = $request->input('schedule_data'); // this must be an associative array, not an object
    $formattedDate = Carbon::now()->format('Y-m-d');

    // ✅ Create a ClassSession and store its ID
    $session = ClassSession::create([
        'school_id'    => $schedule['school_id'],
        'schedule_id'  => $schedule['id'],
        'session_date' => $formattedDate,
    ]);
$c=0;
    foreach ($absences as $absence) {
        if ($absence['type']!='Present') {
         
       $absence= Absence::create([
            'school_id'       => $schedule['school_id'],
            'term_id'        => 1,
            'session_id'      => $session->id, // Use created session ID
            'student_id'      => $absence['student_id'],
            'type'            => $absence['type'],
            'justification_id'=> null,
            'is_justified'    => false,
        ]);
        $c+=1;
    }
   
    }

    return response()->json(['message' => $absence]);
}




}
