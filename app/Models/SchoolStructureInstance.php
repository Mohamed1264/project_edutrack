<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\SchoolStructureUnit;
use App\Models\Group;

class SchoolStructureInstance extends Model
{
    /** @use HasFactory<\Database\Factories\SchoolStructureInstanceFactory> */
    use HasFactory;
    protected $fillable = [
        'school_id','parent_id','school_structure_unit_id','name'
    ];

    public function school(){
        return $this->belongsTo(School::class,'school_id');
    }

    public function school_structure_unit(){
        return $this->belongsTo(SchoolStructureUnit::class,'school_structure_unit_id');
    }
    public function parent()
    {
        return $this->belongsTo(SchoolStructureInstance::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(SchoolStructureInstance::class, 'parent_id');
    }

    public function groups()
    {
        return $this->hasOne(Group::class,'school_structure_unit_id');
    }

    

    
}
