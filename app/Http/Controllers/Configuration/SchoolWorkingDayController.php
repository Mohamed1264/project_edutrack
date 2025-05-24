<?php

namespace App\Http\Controllers\Configuration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SchoolWorkingDay;
use Illuminate\Support\Facades\Auth;
class SchoolWorkingDayController extends Controller
{
    public function save (Request $request){
        $daysIds = $request->days;
        $school = Auth::user()->school;

        $activeModeId = $school->activeMode()->id;
        SchoolWorkingDay::where('school_id', $school->id)
        ->where('mode_id',$activeModeId)
        ->delete();

        foreach($daysIds as $dayId){
            SchoolWorkingDay::create([
                  'school_id'=>$school->id,
                  'day_id'=>$dayId,
                  'mode_id'=>$activeModeId,
                  'note'=>null
            ]);
        }

        return to_route('configuration');
    }
}
