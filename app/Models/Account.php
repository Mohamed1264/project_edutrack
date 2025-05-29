<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\School;
use App\Models\TeacherType;
use Illuminate\Auth\Authenticatable as AuthAuthenticatable;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use App\Models\Teach;
use App\Models\Group;
use App\Models\Guardian;
use App\Models\StudentPath;
use App\Models\Absence;

class Account extends Model implements AuthenticatableContract
{
    /** @use HasFactory<\Database\Factories\AccountFactory> */
    use HasFactory , AuthAuthenticatable, Authorizable;

    protected $fillable = [
        'school_key',
        'user_key',
        'teacher_type_id',
        'password',
        'original_password',
       'is_active',
        'last_reset_password_at',
        'last_login_at',
    ];

    public function user (){
        return $this->belongsTo(User::class,'user_key','user_key');
    }
    public function school (){
        
        return $this->belongsTo(School::class,'school_key','school_key');
    }

    public function teacher_type (){
        return $this->belongsTo(TeacherType::class);
    }

    public function teaches()
{
    return $this->hasMany(Teach::class);
}

public function progressGroups()
{
    return $this->belongsToMany(Group::class, 'group_teacher_progress', 'account_id', 'group_id')
                ->withPivot('current_hours', 'total_hours')
                ->withTimestamps();
}

public function guardians()
{
    return $this->belongsToMany(Guardian::class, 'guardian_student','student_account_id', 'guardian_id');
}

    public function studentPaths()
    {
        return $this->hasMany(StudentPath::class, 'student_account_id');
    }

    // Only the active path
    public function currentPath()
    {
        return $this->hasOne(StudentPath::class, 'student_account_id')->where('is_active', true);
    }
    public function schedules (){
        return $this->hasMany(Schedule::class,'teacher_id');
    }


public function absences (){
    return $this->hasMany(Absence::class,'student_id');
}
}
