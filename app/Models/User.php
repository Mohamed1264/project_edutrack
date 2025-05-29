<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PlatfromRole;
use App\Models\Account;
class User extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    protected $fillable = [
        'full_name',
       'birth_date',
       'gender',
        'email',
        'user_key',
        'phone_number',
       'role_id',
    ];

    public function role(){
        return $this->belongsTo(PlatfromRole::class);
    }
    public function accounts(){
        return $this->HasMany(Account::class);
    }
    

    public function hasRole($role_name){
        return $this->role && $this->role->role_name == $role_name;
    }
}
