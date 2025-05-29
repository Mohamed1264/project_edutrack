<?php

namespace App\Http\Controllers\Schedules;

use App\Http\Controllers\Controller;
use App\Models\SessionInstance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Account;
use App\Models\Schedule;

class ScheduleController extends Controller
{
    public function showSchedulesList($type){
        $school = Auth::user()->school;  
        if (!$school) {
            abort(403, 'Unauthorized action - No school associated with user.');
        }

        switch($type) {
            case 'teachers':
                $teachers = $school->getUsersByRole(3)->all();
                return $this->renderScheduleList($teachers, $type, 'full_name');
            
            case 'groups':
                $groups = $school->getGroups();
                return $this->renderScheduleList($groups, $type, 'name');
                    
            case 'rooms':
                $rooms = $school->rooms;
                return $this->renderScheduleList($rooms, $type, 'room_name');
            
            default: 
                abort(404, 'Invalid schedule type requested.');
        }
    

    }

    public function getSchedule(string $type, int $id)
    {
        $school = Auth::user()->school;
        
        if (!$school) {
            abort(403, 'Unauthorized action - No school associated with user.');
        }
        $timesSlots = $school->activeTimeSlots();
        $workingDays = $school->workingDays->map(function($workingDay) {
            return $workingDay->only(['id', 'day_name', 'day_id']);
        });

        switch($type) {
            case 'teachers':
                $teacher = Account::with('user:user_key,full_name,gender')
                ->where('school_key', $school->school_key)
                ->where('id', $id)
                ->get(['id', 'user_key']);
         ;
                $schedule  = Schedule::where('teacher_id', $id)
                  ->where('school_id', $school->id)
                  ->where('version_end_date', null)
                  ->get()->map(function ($session){
                    return [
                      'id' => $session->id,
                      'display' => [
                        'group' => $session->group->structureInstance->name,
                        'room' => $session->room->room_name,
                        'teacher' => $session->teacher->user->full_name,
                        'day' => $session->day->day_name,
                        'time_slot' => `{$session->time_slot->start_time} - {$session->time_slot->start_time}`,
                      ],
                      'raw' => [
                        'group_id' => $session->group_id,
                        'room_id' => $session->room_id,
                        'teacher_id' => $session->teacher_id,
                        'time_slot_id' => $session->time_slot_id,
                        'day_id' => $session->day_id,
                        'status' => $session->status,
                        'temporary_from' => $session->temporary_from,
                        'temporary_to' => $session->temporary_to,
                        'version_start_date' => $session->version_start_date,
                        'version_end_date' => $session->version_end_date,
                      ],
                    ];
                  });
                if (!$teacher) abort(404, 'Teacher not found.');
                return $this->renderSchedule($teacher,$schedule, $type, 'full_name', $timesSlots, $workingDays);
            
            case 'groups':
                $group = $school->getGroup($id);
                $schedule  =  $school->schedules()->where('version_end_date',null)->where('group_id',$id)->get();
                if (!$group) abort(404, 'Group not found.');
                return $this->renderSchedule($group,$schedule, $type, 'name', $timesSlots, $workingDays);
                    
            case 'rooms':
                $room = $school->rooms->find($id);
                $schedule  =  $school->schedules()->where('version_end_date',null)->where('room_id',$id)->get();
                if (!$room) abort(404, 'Room not found.');
                return $this->renderSchedule($room, $schedule,$type, 'room_name', $timesSlots, $workingDays);
            
            default: 
                abort(404, 'Invalid schedule type requested.');
        }
    }

    public function modifySchedule($id){


       return 'fjff';
    }

    protected function renderScheduleList ($data,$type,$name) { 
          return Inertia::render('admin/SchoolsResources/Schedules/schedulePages/SchedulesList',[
            'data'=>$data,
            'type'=>$type,
            'name'=>$name

      ]);
    }

    protected function renderSchedule($owner , $schedule, string $type, string $nameField, $timeSlots, $workingDays )
    {  
        return Inertia::render('admin/SchoolsResources/Schedules/Schedule', [
            'owner' => $owner,
            'schedule'=>$schedule,
            'type' => $type,
            'name' => $nameField,
            'timeSlots' => $timeSlots,
            'workingDays' => $workingDays,
          
        ]);
    }

}
