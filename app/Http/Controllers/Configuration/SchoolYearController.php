<?php

namespace App\Http\Controllers\Configuration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class SchoolYearController extends Controller
{
    public function create (){
        $school = Auth::user()->school;
        $currentYear = $school->school_years->where('is_active',true)->first();
        if (! $currentYear->end_date) { 
            return back()->with('info','you cannot add new year , end the current year first');
        }else {
            return Inertia::render('Forms/AddForms/AddSchoolYear');

        }
       

    }
}
