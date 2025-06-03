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
        $timeSlotsByTypes = $school->timeSlotsGroupedByType();
        $schoolYears = $school->school_years; 
        $schoolYearsWithTerms = $school->school_years()->with('terms')->get();
        $yearsWithTerms = $schoolYearsWithTerms->map(function ($year) {
            return [
                'id' => $year->id,
                'name' => $year->name,
                'start_date' => $year->start_date,
                'end_date' => $year->end_date,
                'terms' =>  $year->terms()->get()->map(function ($term) {
                return [
                    'id' => $term->id,
                    'name' => $term->term_name,
                    'start_date' => $term->start_date,
                    'end_date' => $term->end_date,
                    'is_active' => $term->is_active,
                    'term_type' => [
                        'id' => $term->termType->id,
                        'name' => $term->termType->term_type,
                    ],
                ];
            }), 
            ];
        });


 
     
        return Inertia::render('admin/Indexes/Configuration',[
            'days'=>$days,
            'workingDaysIds'=>$schoolWorkingDaysIds,
            'timeSlotsTypes'=>$timeSlotsTypes,
            'timeSlotByTypes'=>$timeSlotsByTypes,
            'schoolYears'=>$schoolYears,
            'termsByYears' => $yearsWithTerms
        ]);
    }
}
