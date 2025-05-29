<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Schedule;
class TimeSlot extends Model
{
    /** @use HasFactory<\Database\Factories\TimeSlotFactory> */
    use HasFactory;
    protected $fillable = [
        'school_id',
        'mode_id',
        'type_id',
        'is_active',
        'start_time',
       'end_time'
    ];

    public function mode()
    {
        return $this->belongsTo(TimeSlotsMode::class, 'mode_id');
    }

  
    public function type()
    {
        return $this->belongsTo(TimeSlotType::class, 'type_id');
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    
public function schedules()
{
    return $this->hasMany(Schedule::class,'time_slot_id');
}


}
