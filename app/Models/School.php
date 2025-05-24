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
use App\Models\SessionTemplate;
use App\Models\ScheduleVersion;
use App\Models\SessionInstance;
use App\Models\Event;
use App\Models\AppliedEvent;
use App\Models\ClassSession;
use App\Models\SchoolJustificationReason;
use App\Models\Absence;
use App\Models\SchoolStructureInstance;
use App\Models\WeekDay;
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
            ->select('users.*')
            ->get();
    }

    public function getUsersByRole($roleId){
        return $this->users->where('role_id',$roleId);
    }

    public function school_structure(){
        return $this->hasMany(SchoolStructureUnit::class,'school_id');
    }
    public function school_structure_instances(){
        return $this->hasMany(SchoolStructureInstance::class,'school_id');
    }
    public function getStructureInstanceAndUnit(){
       
            return DB::table('schools')
            ->join('school_structure_instances', 'schools.id', '=', 'school_structure_instances.school_id')
            ->join('school_structure_units', 'school_structure_units.id', '=', 'school_structure_instances.school_structure_unit_id')
            ->join('structure_units', 'structure_units.id', '=', 'school_structure_units.unit_id')
            ->where('schools.id', $this->id)->where('structure_units.unit_name','Levels')
            ->select(
                'school_structure_instances.name',
                'structure_units.unit_name'
            )
            ->get();
        
    }
    

    public function groups(){
        return $this->hasMany(Group::class,'school_id');
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
        ->where('time_slots_modes.id', $this->id)
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
    return $this->hasMany(TimeSlot::class,);
}

public function rooms()
{
    return $this->HasMany(Room::class,);
}

public function sessionTemplates()
{
    return $this->HasMany(SessionTemplate::class,);
}

public function scheduleVersions()
{
    return $this->HasMany(ScheduleVersion::class,);
}

public function sessionInstances()
{
    return $this->HasMany(SessionInstance::class);
}

public function events()
{
    return $this->HasMany(Event::class);
}

public function appliedEvents (){
    return $this->hasMany(AppliedEvent::class,'school_id');
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
