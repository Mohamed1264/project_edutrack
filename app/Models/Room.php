<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\Schedule;

class Room extends Model
{
    /** @use HasFactory<\Database\Factories\RoomFactory> */
    use HasFactory;

    protected $fillable = [
        'school_id',
        'room_name'
    ];
    public function school()
    {
        return $this->belongsTo(School::class);
    }
   
public function schedules()
{
    return $this->hasMany(Schedule::class);
}
}
