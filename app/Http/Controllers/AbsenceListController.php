<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Account;
use App\Models\School;
use App\Models\AbsenceJustification;
use App\Models\StudentPath;
use App\Models\SchoolStructureInstance;
use App\Models\JustificationReason;
use App\Models\Group;
use App\Models\SchoolYear;
use App\Models\WeekDay;
use App\Models\TimeSlot;

use App\Models\SchoolJustificationReason;
use App\Models\Term;
use App\Models\Absence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AbsenceListController extends Controller
{

    public function index()
    {
        $groupIds = Group::where('school_id', Auth::user()->school->id)->pluck('id')->toArray();
    
        $groups = SchoolStructureInstance::whereIn('id', $groupIds)->get();
    
        return Inertia::render('AbsenceManager/AbsenceListes', [
            'group' => $groups
        ]);
    }


    public function group($id)
    {
    
        $group = SchoolStructureInstance::where('id', $id)->first();
    
        $year = SchoolYear::orderBy('start_date', 'desc')->first();

        return Inertia::render('AbsenceManager/GroupAbsenceListes', [
            'year' => $year,
            'group'=>$group
        ]);
    }
   
public function list($id_group, Request $request)
{
    $from = $request->query('from');
    $to = $request->query('to');
    // Query absences within the date range and group
    $group = SchoolStructureInstance::where('id', $id_group)->first();
    $studentIDS = StudentPath::where('group_id',$id_group)->pluck('student_account_id')->toArray();
    $absence=Absence::whereIn('student_id',  $studentIDS)->where('school_id',Auth::user()->school->id)->get();
    $student=User::whereIn('id',  $studentIDS)->get();
    $days=WeekDay::get();
    $sessions=TimeSlot::get();

    return Inertia::render('AbsenceManager/List', [
        'sessions'=>$sessions, 
        'from'=>$from, 
        'group'=>$group, 
        'studentIDS'=>$studentIDS, 
        'student'=>$student, 
        'days'=>$days, 
        'to'=>$to,   
        'absence'=>$absence,   
 
    ]);}

}


