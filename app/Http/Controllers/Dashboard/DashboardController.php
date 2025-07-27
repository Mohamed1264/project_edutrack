<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ClassSession;
use App\Models\School;
use App\Models\User;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Schedule;
use App\Models\WeekDay;

use function Termwind\render;

class DashboardController extends Controller
{
    public function adminDashboard (){
        $school = Auth::user()->school;
        $absenceManagersNumber = $school->getUsersByRole(2)->count();
        $teachersNumber = $school->getUsersByRole(3)->count();
        $studentsNumber = $school->getUsersByRole(4)->count();
        $roomsCount = $school->rooms()->count();
        $fieldsCount = $school->getStructureInstanceAndUnit('Fields')->count();
        $groupsCount = $school->getStructureInstanceAndUnit('Groups')->count();
        $absencesCount = $school->absences->whereBetween('type',['Absent','Quit','Late'])->count();
        $schedulesCount = $school->schedules()->active()->count();
       
        $cardsInfo = [
                ["label" =>'Absence Managers', "type"=>'absenceManagers', "total"=> $absenceManagersNumber,  ],
                ["label" => 'Teachers', "type"=> 'teachers', "total"=> $teachersNumber,  ],
                ["label" => 'Students', "type"=> 'students', "total"=> $studentsNumber,  ],
                ["label" => 'Absence', "type"=> 'absence', "total"=> $absencesCount,  ],
                ["label" => 'Filieres', "type"=> 'filieres', "total"=> $fieldsCount,  ],
                ["label" => 'Groups', "type"=> 'groups', "total"=> $groupsCount,  ],
                ["label" => 'Rooms', "type"=> 'rooms', "total"=> $roomsCount,  ],
                ["label" => 'Schedules', "type"=> 'schedules', "total"=>  $schedulesCount ],  
        ];


        $days = $school->workingDays->map(function($workingDay) {
            return $workingDay;
        });


        // Get all time slots (ordered by start time)
        $timeslots = $school->timeSlots()->where('is_active',true)
        ->orderBy('start_time')->get(['id', 'start_time', 'end_time']);

        // Get all rooms
        $rooms = $school->rooms()->get(['id', 'room_name']);


    $availableRooms = $this->getAvailableRooms($days,$timeslots,$rooms);

    return Inertia::render('admin/Dashboard',[
            'cardsInfo'=>$cardsInfo,
            'availableRooms'=>$availableRooms,
            'days'=>$days,
            'timeSlots'=>$timeslots

        ]);
    }
    

    public function absenceManagerDashboard () { 
        $school = School::where('school_key',Auth::user()->school_key)->get()->first();
     
        $studentsNumber = $school->getUsersByRole(4)->count();
        $cardsInfo = [
            ["label" => 'Students', "type"=> 'students', "total"=> $studentsNumber],
            ["label" => 'Groups', "type"=> 'groups', "total"=> 0] ,
            ["label" => 'Absence', "type"=> 'absence', "total"=> 0],
            ["label" => 'Late', "type"=> 'late', "total"=> 0],
            ["label" => 'Liste Absence', "type"=> 'listeAbsence', "total"=> 0],
            ["label" => 'Yesterdays Absence', "type"=> 'yesterdaysAbsence', "total"=> 0] ,
            ["label" => 'Schedules', "type"=> 'schedules', "total"=> 0 ],
            ["label" => 'Pending Requests', "type"=> 'pendingRequests', "total"=> 0],  
        ];
        return Inertia::render('AbsenceManager/Dashboard',[
            'cardsInfo' => $cardsInfo
        ]);
    }


    public function teacherDashboard () { 
        $teacher = Auth::user();
        $school = $teacher->school;  

        $timesSlots = $school->activeTimeSlots();
        $workingDays = $school->workingDays->map(function($workingDay) {
            return $workingDay->only(['id', 'day_name', 'day_id']);
        });
        $teacherAccount=Account::where('user_key',$teacher->user_key)->first();

        $schedule  = Schedule::where('teacher_id', $teacherAccount->id)
          ->where('school_id', $school->id)
          ->where('version_end_date', null)
          ->get()->map(function ($session){
            $todayName = now()->translatedFormat('l'); // "Monday", "Tuesday" etc.
            $yesterdayName = now()->subDay()->translatedFormat('l');
            $isExists = ClassSession::where('schedule_id',$session->id)
            ->whereBetween('session_date',[now()->startOfWeek(),now()->endOfWeek()])->exists();
            
            // Determine day status
            $dayStatus = match($session->day->day_name) {
                $todayName => 'current',
                $yesterdayName => 'update',
                default => 'disabled'
            };
            return [
              'id' => $session->id,
              'display' => [
                'group' => $session->group->structureInstance->name,
                'room' => $session->type === 'Presential' ? $session->room->room_name : null,
                'teacher' => $session->teacher->user->full_name,
                'day' => $session->day->day_name,
                'time_slot' => $session->time_slot->start_time.' - '.$session->time_slot->end_time,
              ],
              'raw' => [
                'time_slot_id' => $session->time_slot_id,
                'day_id' => $session->day_id,
                'status' => $session->status,
                'type' => $session->type,
                'is_temporary' => $session->is_temporary,
              ],
              'status' => $dayStatus,
              'is_absence_submitted' =>$isExists
            ];
          });


          return Inertia::render('Teacher/Dashboard', [
            'schedule' => $schedule,
            'timeSlots' => $timesSlots,
            'workingDays' => $workingDays,
            'test' =>  $teacherAccount
        ]);
          
        
    }

    public function studentDashboard () { 
        return Inertia::render('Student/Dashboard');
    }


    protected function getAvailableRooms ($days,$timeSlots,$rooms) {
        $school = Auth::user()->school;
        $availability = [];

        foreach ($days as $day) {
            foreach ($timeSlots as $timeslot) {
                // Get room IDs already booked for this day+timeslot
                $bookedRoomIds = Schedule::where('day_id', $day->id)
                ->where('time_slot_id', $timeslot->id)
                ->where('school_id', $school->id)
                ->where('version_end_date',null)
                ->pluck('room_id');
    

                // Filter available rooms
                $availableRooms = $rooms->whereNotIn('id', $bookedRoomIds)->map(function ($room){
                    return [
                        'room_name'=>$room->room_name
                    ];
                });


                $availability[] = [
                    'day_id' => $day->id,
                    'day_name' => $day->day_name,
                    'timeslot_id' => $timeslot->id,
                    'start_time'=>$timeslot->start_time,
                    'end_time'=>$timeslot->end_time,
                    'available_rooms' => $availableRooms,
                ];
            }
        }
        return $availability;
    }

  
}
