<?php

namespace App\Http\Controllers\Schedules;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Account;
use App\Models\Schedule;
use App\Models\Room;
use App\Models\Group;
use App\Models\User;
use LDAP\Result;

use function Symfony\Component\Clock\now;

class ScheduleController extends Controller
{
   
    public function showSchedulesList($type)
{
    $school = Auth::user()->school;

    if (!$school) {
        abort(403, 'Unauthorized action - No school associated with user.');
    }

    switch ($type) {
        case 'teachers':
            $teachers = $school->getUsersByRole(3)->get();
             // Assuming 3 is the teacher role
             
            return $this->renderScheduleList($teachers, $type, 'full_name', 'user_key');

        case 'groups':
            $groups = $school->getGroups(); // Assuming this returns a collection
            return $this->renderScheduleList($groups, $type, 'name', 'id');

        case 'rooms':
            $rooms = $school->rooms; // Assuming this is a relationship
            return $this->renderScheduleList($rooms, $type, 'room_name', 'id');

        default:
            abort(404, 'Invalid schedule type requested.');
    }
}


    public function show(string $type, int $id)
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
                ->get(['id', 'user_key'])->first();
         ;
                $schedule  = Schedule::where('teacher_id', $id)
                  ->where('school_id', $school->id)
                  ->orderBy('version_end_date','desc')
                  ->get()->map(function ($session){
                    return $this->session($session);
                  });
                  
                if (!$teacher) abort(404, 'Teacher not found.');
                return $this->renderSchedule($teacher,$schedule, $type, 'full_name', $timesSlots, $workingDays);
            
            case 'groups':
                $group = Group::getGroupInfo($id,$school->id);
                $schedule  = Schedule::where('group_id', $id)
                  ->where('school_id', $school->id)
                  ->orderBy('version_end_date','desc')
                  ->get()->map(function ($session){
                    return $this->session($session);
                  });
                  $timesSlots =collect( $school->activeTimeSlots())->filter(function ($timeSlot){
                    return $timeSlot->type_id !== 3;
                  });
                
                if (!$group) abort(404, 'Group not found.');
                return $this->renderSchedule($group,$schedule, $type, 'name', $timesSlots, $workingDays);
                    
            case 'rooms':
                $room = $school->rooms->find($id);
                $schedule  = Schedule::where('room_id', $id)
                ->where('school_id', $school->id)
                ->orderBy('version_end_date','desc')
                ->get()->map(function ($session){
                  return $this->session($session);
                });
                if (!$room) abort(404, 'Room not found.');
                return $this->renderSchedule($room, $schedule,$type, 'room_name', $timesSlots, $workingDays);
            
            default: 
                abort(404, 'Invalid schedule type requested.');
        }
    }

    public function session(Schedule $session){
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
             'group_id' => $session->group_id,
             'room_id' => $session->room_id,
             'teacher_id' => $session->teacher_id,
             'time_slot_id' => $session->time_slot_id,
             'day_id' => $session->day_id,
             'replace_session_id' => $session->replace_session_id,
             'status' => $session->status,
             'type' => $session->type,
             'is_temporary' => $session->is_temporary,
             'temporary_from' => $session->temporary_from,
             'temporary_to' => $session->temporary_to,
             'version_start_date' => $session->version_start_date,
             'version_end_date' => $session->version_end_date,
           ],
           'is_saved'=>true,
         ];
       
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
            'sessions'=>$schedule,
            'type' => $type,
            'name' => $nameField,
            'timeSlots' => $timeSlots,
            'workingDays' => $workingDays,
        ]);
    }

    public function getAvailability(Request $request)
{
    $dayId = $request->query('day_id');
    $timeSlotId = $request->query('time_slot_id');
    $schoolId =  Auth::user()->school->id;
    $schoolKey =  Auth::user()->school->school_key;

    // Get unavailable rooms
    $busyRoomIds = Schedule::where('day_id', $dayId)
        ->where('time_slot_id', $timeSlotId)
        ->where('school_id', $schoolId)
        ->where('version_end_date',null)
        ->pluck('room_id');

    // Get unavailable groups
    $busyGroupIds = Schedule::where('day_id', $dayId)
        ->where('time_slot_id', $timeSlotId)
        ->where('school_id', $schoolId)
        ->where('version_end_date',null)
        ->pluck('group_id');

    $busyTeachersIds = Schedule::where('day_id', $dayId)
        ->where('time_slot_id', $timeSlotId)
        ->where('school_id', $schoolId)
        ->where('version_end_date',null)
        ->pluck('teacher_id');

    // Get available rooms and groups
    $availableRooms = Room::where('school_id', $schoolId)
        ->whereNotIn('id', $busyRoomIds)
        ->get(['id', 'room_name']);

    $availableGroups = Group::with('structureInstance:id,name')
        ->where('school_id', $schoolId)
        ->whereNotIn('id',$busyGroupIds)
        ->get(['id','school_structure_unit_id'])
        ->map(function($group){ 
            return [
                'id'=>$group->id, 
                'name'=>$group->structureInstance->name
            ];
        });

    $teacherIDS=User::where('role_id',3)->pluck('user_key')->toArray();

    $availableTeachers = Account::with('user:user_key,full_name')
        ->where('school_key', $schoolKey)
        ->whereIn('user_key',$teacherIDS)
        ->whereNotIn('id',$busyTeachersIds)
        ->get(['id','user_key'])
        ->map(function($account){ 
            return [
                'id'=>$account->id, 
                'name'=>$account->user->full_name
            ];
        });

    return response()->json([
        'available'=> [
        'rooms' => $availableRooms,
        'groups' => $availableGroups,
        'teachers' => $availableTeachers,  
    ] 
    ]);
}


public function save(Request $request){
    $sessions = $request->sessions;
    $school = Auth::user()->school;
    $activeTerm = $school->terms()->where('is_active',true)->get()->first();

    foreach ($sessions as $session) {
        if (!isset($session['action']) || !$session['action']) {
            continue ;
        }
     

        switch ($session['action']) {
            case 'create':
                $raw = $session['raw'];
                Schedule::create([
                    ...$raw,
                    'school_id'=>$school->id,
                    'term_id'=>$activeTerm->id,
                    'version_start_date'=>now(),
                ]);
                break;
            case 'update':
                $raw = $session['raw'];
                $session = Schedule::find($session['id']);
                $session->update([
                        'status' =>'Archived',
                        'version_end_date'=>now(),
                ]);
                Schedule::create([
                    ...$raw,
                    'school_id'=>$school->id,
                    'term_id'=>$activeTerm->id,
                    'version_start_date'=>now(),
                ]);
                break;
            case 'delete':
                    $raw = $session['raw'];
                    $session = Schedule::find($session['id']);
                    $session->update([
                        'status' =>'Archived',
                        'version_end_date'=>now(),
                    ]);
                    break;
            
            default:
                # code...
                break;
        }
    }

    return back();


}



public function clearSchedule (Request $request){
    $type = $request->type;
    $id = $request->id;
    $foreginKey =  match ($type) {
        'teachers' => 'teacher_id',
         'groups'=> 'group_id',
         'rooms'=> 'room_id',
    };
    $isExists = Schedule::where($foreginKey,$id)
    ->where('version_end_date',null)->exists();
    if ($isExists) {
        if ($request->wantsJson() || $request->header('X-Inertia')) {
            return response()->json(['success' => false, 'message' => 'Schedule already empty'], 200);
        }
        return to_route('schoolResources.schedules.list',$type)->with('error','schedule already empty');
    }
     
    Schedule::where($foreginKey,$id)->delete();

    return to_route('schoolResources.schedules.list',$type)->with('success','schedule cleared successfuly');
   
}

}
