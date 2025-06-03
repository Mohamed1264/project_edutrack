<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\Term;
use App\Models\Account;
use App\Models\Group;
use App\Models\Room;
use App\Models\WeekDay;
use App\Models\TimeSlot;
use App\Models\ClassSession;

class Schedule extends Model
{
    /** @use HasFactory<\Database\Factories\ScheduleFactory> */
    use HasFactory;
    protected $fillable = [
        'school_id',
        'room_id',
        'teacher_id',
        'group_id',
        'time_slot_id',
        'day_id',
        'status',
        'temporary_from',
        'temporary_to',
        'term_id',
        'version_start_date',
        'version_end_date',
        'is_temporary',
        'type',
    ];

    public function school (){
        return $this->belongsTo(School::class,'school_id');
    }
    public function term (){
        return $this->belongsTo(Term::class,'term_id');
    }
    public function teacher (){
        return $this->belongsTo(Account::class,'teacher_id');
    }
    public function group (){
        return $this->belongsTo(Group::class,'group_id');
    }
    public function room (){
        return $this->belongsTo(Room::class,'room_id');
    }
    public function day (){
        return $this->belongsTo(WeekDay::class,'day_id');
    }
    public function time_slot (){
        return $this->belongsTo(TimeSlot::class,'time_slot_id');
    }

    public function sessions(){
        return $this->hasMany(ClassSession::class,'schedule_id');
    }

    public function scopeActive($query)
    {
        return $query->whereNull('version_end_date');
    }
}
