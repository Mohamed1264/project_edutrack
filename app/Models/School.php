<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PlatfromAdmin;
use App\Models\SchoolType;
use App\Models\PlatfromRole;
use App\Models\Account;
use Illuminate\Support\Facades\DB;
use App\Models\SchoolStructureUnit;
use App\Models\Module;
use App\Models\SchoolYear;
use App\Models\StudentPath;
use App\Models\Term;
use App\Models\TimeSlotsMode;
use App\Models\TimeSlotType;
use App\Models\TimeSlot;
use App\Models\SchoolWorkingDay;
use App\Models\Room;
use App\Models\Schedule;

use App\Models\Event;
use App\Models\AppliedEvent;
use App\Models\ClassSession;
use App\Models\SchoolJustificationReason;
use App\Models\Absence;
use App\Models\SchoolStructureInstance;
use App\Models\WeekDay;

use Carbon\Carbon;
class School extends Model
{
    /** @use HasFactory<\Database\Factories\SchoolFactory> */
    use HasFactory;

    protected $fillable = ['school_name','school_type_id','created_by','school_key'];

    public function platformAdmin(){
        return $this->belongsTo(PlatfromAdmin::class,'id','id');
    }
    public function schoolType(){
        return $this->belongsTo(SchoolType::class);
    }
    public function roles(){
        return $this->belongsToMany(PlatfromRole::class);
    }
    public function accounts(){
        return $this->HasMany(Account::class,'school_key','school_key');
    }

    public function getUsersAttribute (){
       return DB::table('users')
            ->join('accounts', 'users.user_key', '=', 'accounts.user_key')
            ->where('accounts.school_key', $this->school_key)
            ->select('users.*','accounts.*')
            ->get();
    }

    public function teachers (){
        return Account::with('user:user_key,full_name,gender')
        ->where('school_key',$this->school_key)
        ->whereNot('teacher_type_id',null)
        ->get(['id','user_key']);
    }

    public function getUserInfo($id){
        return DB::table('users')
             ->join('accounts', 'users.user_key', '=', 'accounts.user_key')
             ->where('accounts.school_key', $this->school_key)
             ->where('accounts.id',$id)
             ->select('users.full_name','users.gender','accounts.id')
             ->get();
     }

    public function getUsersByRole($roleId){
        return $this->users->where('role_id',$roleId)->values();
    }

    public function school_structure(){
        return $this->hasMany(SchoolStructureUnit::class,'school_id');
    }
    public function school_structure_instances(){
        return $this->hasMany(SchoolStructureInstance::class,'school_id');
    }
    public function getStructureInstanceAndUnit($unit){
       
        return DB::table('schools')
        ->join('school_structure_instances', 'schools.id', '=', 'school_structure_instances.school_id')
        ->join('school_structure_units', 'school_structure_units.id', '=', 'school_structure_instances.school_structure_unit_id')
        ->join('structure_units', 'structure_units.id', '=', 'school_structure_units.unit_id')
        // Add left join for parent instance
        ->leftJoin('school_structure_instances as parent', 'school_structure_instances.parent_id', '=', 'parent.id')
        ->where('schools.id', $this->id)
        ->where('structure_units.unit_name', $unit)
        ->select(
            'school_structure_instances.name as instance_name',
            'structure_units.unit_name',
            'parent.name as parent_name'  // Add parent name to select
        )
        ->get();
        
    }
    public function getStructureInstanceByParentId($parentId){
       
        return DB::table('schools')
        ->join('school_structure_instances', 'schools.id', '=', 'school_structure_instances.school_id')
        ->join('school_structure_units', 'school_structure_units.id', '=', 'school_structure_instances.school_structure_unit_id')
        ->join('structure_units', 'structure_units.id', '=', 'school_structure_units.unit_id')
        // Add left join for parent instance
        ->leftJoin('school_structure_instances as parent', 'school_structure_instances.parent_id', '=', 'parent.id')
        ->where('schools.id', $this->id)
        ->where('parent.id', $parentId)
        ->select(
            'school_structure_instances.name as instance_name',
            'structure_units.unit_name',
            'parent.name as parent_name'  // Add parent name to select
        )
        ->get();
        
    }
    

    public function groups(){
        return $this->hasMany(Group::class,'school_id');
    }

    public function getGroups(){
        return DB::table('groups')
        ->join('schools','schools.id','=','groups.school_id')
        ->join('school_structure_instances as SSI','SSI.id' ,'=','groups.school_structure_instance_id')
        ->where('groups.school_id',$this->id)
        ->select('groups.id','SSI.name','groups.type')
        ->get();
    }
    public function getGroupInfo($id){
        return DB::table('groups')
        ->join('schools','schools.id','=','groups.school_id')
        ->join('school_structure_instances as SSI','SSI.id' ,'=','groups.school_structure_instance_id')
        ->where('groups.school_id',$this->id)
        ->where('groups.id',$id)
        ->select('groups.id','SSI.name','groups.type')
        ->get();
    }

    public function modules (){
        return $this->hasMany(Module::class,'school_id');
    }

    public function school_years (){
        return $this->hasMany(SchoolYear::class,'school_id');
    }



    public function studentPaths()
    {
        return $this->hasMany(StudentPath::class);
    }

    // Optionally, get all current students in this school
    public function activeStudentPaths()
    {
        return $this->studentPaths()->where('is_active', true);
    }

    public function terms()
    {
        return $this->hasMany(Term::class,'school_id');
    }

    public function workingDays()
    {
        return $this->belongsToMany(WeekDay::class, 'school_working_days', 'school_id', 'day_id')
            ->using(SchoolWorkingDay::class)
            ->withPivot('mode_id', 'note') // include additional columns
            ->withTimestamps();
    }

  



    public function timeSlotsModes()
    {
        return $this->hasMany(TimeSlotsMode::class,'school_id');
    }
    public function activeMode(){
        return  DB::table('time_slots_modes')
        ->join('schools', 'schools.id', '=', 'time_slots_modes.school_id')
        ->where('time_slots_modes.school_id', $this->id)
        ->where('time_slots_modes.is_active',true)
        ->select('time_slots_modes.*')
        ->get()->first();
    }

    public function timeSlotTypes()
{
    return $this->belongsToMany(TimeSlotType::class, 'school_time_slots_types', 'school_id', 'type_id');
}


public function timeSlots()
{
    return $this->hasMany(TimeSlot::class);
}

public function activeTimeSlots (){
    return  $this->timeSlots()->where('mode_id',$this->activeMode()->id)
    ->where('is_active',true)
    ->select('id','start_time','end_time')->get()->all();
}
public function timeSlotsGroupedByType()
{
    return $this->timeSlotTypes()
    ->with(['timeSlots' => function($query) {
        $query->where('school_id', $this->id)
              ->where('mode_id', $this->activeMode()->id)
              ->where('is_active', true)
              ->withCount('sessionInstances');// Efficiently count sessions
              
    }])
    ->get()
    ->map(function($type) {
        // Check if any slot in this type has sessions
        $hasSessions = $type->timeSlots->contains(function($slot) {
            return $slot->session_instances_count > 0;
        });
       

        return [
            'type' => $type->time_slot_type,
            'type_id'=>$type->id,
            'is_type_has_sessions' => $hasSessions, // Global flag for the type
            'slots' => $type->timeSlots->map(function($slot) {
                return [
                    'id' => $slot->id,
                    'start_time' => Carbon::parse($slot->start_date)->format('H:i'),
                    'end_time' => Carbon::parse($slot->end_date)->format('H:i'),
                    'has_sessions' => $slot->session_instances_count > 0,
                ];
            })
        ];
    });
}

public function rooms()
{
    return $this->HasMany(Room::class);
}



public function getActiveSessionInstances( $ownerId, $ownerFK)
    {
        return  DB::table('session_instances as SI')
        ->join('schools as S' , 'S.id','=','SI.school_id')
        ->join('session_templates as ST' , 'ST.id','=','SI.session_template_id')
        ->join('week_days as D' , 'D.id','=','SI.day_id')
        ->join('time_slots as TS' , 'TS.id','=','SI.time_slot_id')
        ->join('session_versions as SV' , 'SV.id','=','SI.version_id')
        ->where('SI.school_id',$this->id)
        ->where(`ST.{$ownerFK}`,$ownerId)
        ->where(`SV.is_current`,true)
        ->select('S.id','SI.status','SI.start_date','SI.end_time',
        'D.id','D.day_name','TS.id','TS.start_date','TS.end_date',
        'ST.teacher_id','ST.group_id','ST.room_id')
        ->get();
        ;
    }

public function events()
{
    return $this->HasMany(Event::class);
}

public function appliedEvents (){
    return $this->hasMany(AppliedEvent::class,'school_id');
}
public function schedules (){
    return $this->hasMany(Schedule::class,'school_id');
}
public function classSessions (){
    return $this->hasMany(ClassSession::class,'school_id');
}
public function justificationReasons (){
    return $this->hasMany(SchoolJustificationReason::class,'school_id');
}

public function absences (){
    return $this->hasMany(Absence::class,'school_id');
}


}
