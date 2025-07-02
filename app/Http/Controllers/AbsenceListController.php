<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Account;
use App\Models\School;
use App\Models\AbsenceJustification;
use App\Models\StudentPath;
use App\Models\SchoolStructureInstance;
use App\Models\JustificationReason;

use App\Models\SchoolJustificationReason;
use App\Models\Term;
use App\Models\Absence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AbsenceListController extends Controller
{

    public function index()
{

 


    return Inertia::render('AbsenceManager/List', [
        
    ]);
}
}
