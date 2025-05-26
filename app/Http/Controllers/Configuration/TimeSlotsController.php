<?php

namespace App\Http\Controllers\Configuration;

use App\Http\Controllers\Controller;
use App\Models\TimeSlot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class TimeSlotsController extends Controller
{
    public function save (Request $request){
        $sessionsInfo = $request->sessionsInfo;
        $type_id =$sessionsInfo['type_id'];
        $start_time = Carbon::parse($sessionsInfo['start_time']);
        $end_time = Carbon::parse($sessionsInfo['end_time']);
        $duration = (int)$sessionsInfo['session_duration'];
        $school = Auth::user()->school;
        $activeModeId = $school->activeMode()->id;
        $slots = [];

        while ($start_time->copy()->addMinutes($duration)->lte($end_time)) {
            $slotEnd = $start_time->copy()->addMinutes($duration);

            $slots[] = [
                'start_date' => $start_time->format('H:i'),
                'end_date' => $slotEnd->format('H:i'),
                'type_id' => $type_id,
                'school_id' => $school->id,
                'mode_id'=>$activeModeId,
                'is_active'=>true,
            ];
         

            $start_time = $slotEnd;
        }
        TimeSlot::insert($slots);
           
    }
}
