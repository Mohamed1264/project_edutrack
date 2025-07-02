<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Account;
use App\Models\Group;
use App\Models\SchoolYear;
use App\Models\PathStatusType;
use App\Models\School;
class StudentPath extends Model
{
    /** @use HasFactory<\Database\Factories\StudentPathFactory> */
    use HasFactory;

    protected $fillable = [
        'school_id','student_account_id','group_id',
        'school_year_id','path_status_id','is_active','is_primary'
    ];

    public function status()
    {
        return $this->belongsTo(PathStatusType::class, 'path_status_id');
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function student()
    {
        return $this->belongsTo(Account::class,'student_account_id');
    }

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function schoolYear()
    {
        return $this->belongsTo(SchoolYear::class, 'school_year_id');
    }
}
