<?php

namespace App\Http\Controllers\Configuration;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\WeekDay;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConfigurationController extends Controller
{
    public function showConfiguration (){
        $school = Auth::user()->school;
        $days = WeekDay::all();
        $timeSlotsTypes = $school->timeSlotTypes->pluck('time_slot_type');

        $schoolWorkingDaysIds = $school->workingDays->pluck('id');

        return Inertia::render('admin/Indexes/Configuration',[
            'days'=>$days,
            'workingDaysIds'=>$schoolWorkingDaysIds,
            'timeSlotsTypes'=>$timeSlotsTypes
        ]);
    }
}
