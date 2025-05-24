<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\WeekDay;
use App\Models\TimeSlotsMode;
use Illuminate\Database\Eloquent\Relations\Pivot;
class SchoolWorkingDay extends Pivot
{
  
    protected $table = 'school_working_days';
    protected $fillable = [
        'school_id',
        'day_id',
        'mode_id',
        'note'
    ];


    public function mode()
    {
        return $this->belongsTo(TimeSlotsMode::class, 'mode_id');
    }
}
