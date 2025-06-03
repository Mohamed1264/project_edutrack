<?php

namespace App\Http\Controllers\Absence;

use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AbsenceController extends Controller
{
    public function create($id) {
        $session = Schedule::findOrFile($id);
        $group = Group::with('school_structure_instance:id,name')->where('id',$session->group_id)->get(['id','school_structure_instance_id'])->first();
        return Inertia::render('teacher.takeAbsence');
    }
}
