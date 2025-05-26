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
        $timeSlotsTypes = $school->timeSlotTypes->map(function ($item) {
            return $item->only(['id', 'time_slot_type']);
        });
        $schoolWorkingDaysIds = $school->workingDays->pluck('id');
        $activeModeId = $school->activeMode()->id;
        $timeSlots = $school->activeTimeSlots();
        $timeSlotsByTypes = $school->timeSlotsGroupedByType();
     
        return Inertia::render('admin/Indexes/Configuration',[
            'days'=>$days,
            'workingDaysIds'=>$schoolWorkingDaysIds,
            'timeSlotsTypes'=>$timeSlotsTypes,
            'timeSlotByTypes'=>$timeSlotsByTypes,
        ]);
    }
}
