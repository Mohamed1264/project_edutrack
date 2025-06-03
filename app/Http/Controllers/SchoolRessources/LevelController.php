<?php

namespace App\Http\Controllers\SchoolRessources;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LevelController extends Controller
{
    public function index () { 
        $school = Auth::user()->school;
        $levels  = $school->levels;
    }
}
