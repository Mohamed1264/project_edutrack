<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SchoolWorkingDay;
use App\Models\Schedule;

use App\Models\School;
class WeekDay extends Model
{
    /** @use HasFactory<\Database\Factories\WeekDayFactory> */
    use HasFactory;
    protected $fillable = [
        'day_name',
    ];



public function schools()
{
    return $this->belongsToMany(School::class, 'school_working_days', 'day_id', 'school_id')
        ->using(SchoolWorkingDay::class)
        ->withPivot('mode_id', 'note')
        ->withTimestamps();
}

public function schedules()
{
    return $this->hasMany(Schedule::class,'day_id');
}

}
