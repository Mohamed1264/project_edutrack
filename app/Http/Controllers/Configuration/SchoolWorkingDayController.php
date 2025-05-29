<?php

namespace App\Http\Controllers\Configuration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SchoolWorkingDay;
use Illuminate\Support\Facades\Auth;
class SchoolWorkingDayController extends Controller
{
    public function save (Request $request){
        $daysIds = $request->selectedDaysIds;
        $school = Auth::user()->school;
        $activeModeId = $school->activeMode()->id;
        $existingDayIds = SchoolWorkingDay::where('school_id', $school->id)
        ->where('mode_id',$activeModeId)
        ->pluck('day_id')->toArray();
        $toInsert = array_diff($daysIds, $existingDayIds); 
        $toDelete = array_diff( $existingDayIds,$daysIds); 

        foreach($toInsert as $dayId){
            SchoolWorkingDay::create([
                    'school_id'=>$school->id,
                    'day_id'=>$dayId,
                    'mode_id'=>$activeModeId,
                    'note'=>null
            ]);  
        }
        SchoolWorkingDay::where('school_id',$school->id)
        ->where('mode_id',$activeModeId)
        ->whereIn('day_id',$toDelete)
        ->delete();

        return redirect()->back();
    }
}
