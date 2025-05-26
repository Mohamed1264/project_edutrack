<?php

namespace App\Http\Controllers\Schedules;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function showSchedulesList($type){
        $school = Auth::user()->school;
          switch($type){
            case 'teachers':
                $teachers = $school->getUsersByRole(3)->all();
                return Inertia::render('admin/SchoolsResources/Schedules/schedulePages/SchedulesList',[
                     'data'=>$teachers,
                     'type'=>$type,
                     'name'=>'full_name'

                ]);
                
            
            case 'groups':
                    $groups = $school->getGroups();
                    return Inertia::render('admin/SchoolsResources/Schedules/schedulePages/SchedulesList',[
                        'data'=>$groups,
                        'type'=>$type,
                        'name'=>'name'
   
                   ]);
                    
            case 'rooms':
                     $rooms = $school->rooms;
                     return Inertia::render('admin/SchoolsResources/Schedules/schedulePages/SchedulesList',[
                        'data'=>$rooms,
                        'type'=>$type,
                        'name'=>'room_name'
   
                   ]);
            default : abort(404);

          }
    }

    public function getSchedule($type, $id){
          
        $school = Auth::user()->school;
          switch($type){
            case 'teachers':
                $teachers = $school->getUsersByRole(3)->all();
                return Inertia::render('admin/SchoolsResources/Schedules/schedulePages/SchedulesList',[
                     'data'=>$teachers,
                     'type'=>$type,
                     'name'=>'full_name'

                ]);
                
            
            case 'groups':
                    $groups = $school->getGroups();
                    return Inertia::render('admin/SchoolsResources/Schedules/schedulePages/SchedulesList',[
                        'data'=>$groups,
                        'type'=>$type,
                        'name'=>'name'
   
                   ]);
                    
            case 'rooms':
                     $rooms = $school->rooms;
                     return Inertia::render('admin/SchoolsResources/Schedules/schedulePages/SchedulesList',[
                        'data'=>$rooms,
                        'type'=>$type,
                        'name'=>'room_name'
   
                   ]);
            default : abort(404);

          }
    }
    public function modifySchedule($id){

    }
}
