<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\TimeSlot;
class TimeSlotType extends Model
{
    /** @use HasFactory<\Database\Factories\TimeSlotTypeFactory> */
    use HasFactory;
    protected $fillable = [
        'time_slot_type',
    ];
    
public function schools()
{
    return $this->belongsToMany(School::class, 'school_time_slots_types', 'type_id', 'school_id');
}

public function timeSlots()
{
    return $this->hasMany(TimeSlot::class,'type_id');
}



}
