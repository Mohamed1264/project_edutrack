<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\SchoolYear;
use App\Models\TermType;
use App\Models\Schedule;
use App\Models\Absence;
class Term extends Model
{
    /** @use HasFactory<\Database\Factories\TermFactory> */
    use HasFactory;
    protected $fillable = [
        'school_year_id',
        'school_id',
        'term_type_id',
        'term_name',
        'start_date',
        'end_date',
        'is_active'
    ];

    public function schoolYear()
    {
        return $this->belongsTo(SchoolYear::class , 'school_year_id');
    }

    public function school()
    {
        return $this->belongsTo(School::class, 'school_id');
    }

    public function termType()
    {
        return $this->belongsTo(TermType::class , 'term_type_id');
    }

    public function schedules()
{
    return $this->HasMany(Schedule::class);
}


public function absences (){
    return $this->hasMany(Absence::class,'term_id');
}
}
