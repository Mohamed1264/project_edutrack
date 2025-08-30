<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\SchoolStructureInstance;
use App\Models\Teach;
use App\Models\Account;
use App\Models\StudentPath;
use App\Models\Schedule;
use Illuminate\Support\Facades\DB;
class Group extends Model
{
    /** @use HasFactory<\Database\Factories\GroupsFactory> */
    use HasFactory;
    protected $fillable = [
        'school_structure_unit_id','type','school_id'
    ];
    public function school()
    {
        return $this->belongsTo(School::class,'school_id');
    }

    public static function getGroupInfo($id,$school_id){
        return DB::table('groups')
        ->join('schools','schools.id','=','groups.school_id')
        ->join('school_structure_instances as SSI','SSI.id' ,'=','groups.school_structure_unit_id')
        ->where('groups.school_id',$school_id)
        ->where('groups.id',$id)
        ->select('groups.id','SSI.name','groups.type')
        ->get()->first();
    }


    public function structureInstance()
{
    return $this->belongsTo(SchoolStructureInstance::class,'school_structure_unit_id');
}
    
public function mergedFrom()
{
    return $this->belongsToMany(Group::class, 'group_merges', 'merged_group_id', 'original_group_id');
}

// For original groups like Group 1, Group 2
public function mergedInto()
{
    return $this->belongsToMany(Group::class, 'group_merges', 'original_group_id', 'merged_group_id');
}
   
public function teaches()
{
    return $this->hasMany(Teach::class);
}

public function teacherProgress()
{
    return $this->belongsToMany(Account::class, 'group_teacher_progress', 'group_id', 'account_id')
                ->withPivot('current_hours', 'total_hours')
                ->withTimestamps();
}
public function parent()
{
    return $this->belongsTo(SchoolStructureInstance::class, 'school_structure_unit_id');
}

public function studentPaths()
{
    return $this->hasMany(StudentPath::class);
}
public function schedules()
{
    return $this->hasMany(Schedule::class);
}

public function activeStudents()
{
    return $this->hasMany(StudentPath::class)->where('is_active', true);
}

}
