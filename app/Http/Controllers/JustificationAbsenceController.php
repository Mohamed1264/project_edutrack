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


class JustificationAbsenceController extends Controller
{
    public function index()
{

    // Get all unjustified absences for the school
    $justifications = Absence::where('is_justified', 0)
        ->where('school_id', Auth::user()->school->id)
        ->get();

    // Get student IDs with unjustified absences
    $justifiedStudentIds = $justifications->pluck('student_id')->unique();

    // Get students without unjustified absences, with their group and absences
    $studentsWithoutJustification = StudentPath::whereIn('student_account_id', $justifiedStudentIds)
    ->get();

    $reasons=JustificationReason::get();

    // Build array of absence data
    $absenceData = $studentsWithoutJustification->map(function ($student,$cptA=0,$cptL=0) {
        $cptA=Absence::where('is_justified', 0)->where('school_id',Auth::user()->school->id)->where('type', 'Absent')->count();
        $cptL=Absence::where('is_justified', 0)->where('school_id',Auth::user()->school->id)->where('type', 'Late')->count();
        $name = User::where('id', $student->student_account_id)->value('full_name');
        
        $group = SchoolStructureInstance::where('id', $student->group_id)->value('name');
        $absence = Absence::where('is_justified', 0)
        ->where('student_id', $student->student_account_id)
        ->where('type', 'Absent')
        ->latest()
        ->first();        
        return [
            "idAbsence"       => $absence->id, // use null-safe operator in case no absence exists
            'fullName'        => $name,
            'group'           => $group,
            'typeAbsence'     => 'Absent',
            'totalAbsence'    => $cptA,
            'totalLate'       => $cptL,
            'successiveDates' => Absence::where('type', 'Absent')
                ->take(3)
                ->pluck('created_at')
                ->map(fn ($date) => $date->format('Y-m-d'))
                ->implode(', '),
        ];
    });

    return Inertia::render('AbsenceManager/Justification', [
        'justif' => $absenceData,
        'reasons'=>$reasons
    ]);
}

public function confirm($ids, $justif)
{
    // Convert comma-separated string to array
    $idArray = explode(',', $ids);

    $justification = Absence::where('school_id', Auth::user()->school->id)
        ->whereIn('id', $idArray);

    $justification->update([
        'is_justified' => 1,
    ]);

     return  redirect('/justification');

}


        

    

    public function create()
    {
        $school = Auth::user()->school;
        
        $justificationReasons = SchoolJustificationReason::where('school_id', $school->id)
            ->where('is_active', true)
            ->get();
            
        $terms = Term::where('school_id', $school->id)
            ->where('is_active', true)
            ->get();

        return Inertia::render('AbsenceManager/CreateJustification', [
            'justificationReasons' => $justificationReasons,
            'terms' => $terms,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'justification_reason_id' => 'required|exists:school_justification_reasons,id',
            'term_id' => 'required|exists:terms,id',
            'justification_date' => 'required|date',
            'description' => 'nullable|string|max:500',
        ]);

        $school = Auth::user()->school;

        $justification = AbsenceJustification::create([
            'school_id' => $school->id,
            'justification_reason_id' => $request->justification_reason_id,
            'term_id' => $request->term_id,
            'justification_date' => $request->justification_date,
            'description' => $request->description,
        ]);

        return redirect()->route('justifications.index')
            ->with('success', 'Justification created successfully.');
    }

    public function show($id)
    {
        $school = Auth::user()->school;
        
        $justification = AbsenceJustification::with(['school', 'term', 'justificationReason', 'absences'])
            ->where('school_id', $school->id)
            ->findOrFail($id);

        return Inertia::render('AbsenceManager/ShowJustification', [
            'justification' => $justification,
        ]);
    }

    public function edit($id)
    {
        $school = Auth::user()->school;
        
        $justification = AbsenceJustification::where('school_id', $school->id)
            ->findOrFail($id);
            
        $justificationReasons = SchoolJustificationReason::where('school_id', $school->id)
            ->where('is_active', true)
            ->get();
            
        $terms = Term::where('school_id', $school->id)
            ->get();

        return Inertia::render('AbsenceManager/EditJustification', [
            'justification' => $justification,
            'justificationReasons' => $justificationReasons,
            'terms' => $terms,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'justification_reason_id' => 'required|exists:school_justification_reasons,id',
            'term_id' => 'required|exists:terms,id',
            'justification_date' => 'required|date',
            'description' => 'nullable|string|max:500',
        ]);

        $school = Auth::user()->school;
        
        $justification = AbsenceJustification::where('school_id', $school->id)
            ->findOrFail($id);

        $justification->update([
            'justification_reason_id' => $request->justification_reason_id,
            'term_id' => $request->term_id,
            'justification_date' => $request->justification_date,
            'description' => $request->description,
        ]);

        return redirect()->route('justifications.index')
            ->with('success', 'Justification updated successfully.');
    }

    public function destroy($id)
    {
        $school = Auth::user()->school;
        
        $justification = AbsenceJustification::where('school_id', $school->id)
            ->findOrFail($id);

        // Check if justification is linked to any absences
        if ($justification->absences()->count() > 0) {
            return back()->with('error', 'Cannot delete justification that is linked to absences.');
        }

        $justification->delete();

        return redirect()->route('justifications.index')
            ->with('success', 'Justification deleted successfully.');
    }

    public function applyToAbsences(Request $request, $id)
    {
        $request->validate([
            'absence_ids' => 'required|array',
            'absence_ids.*' => 'exists:absences,id',
        ]);

        $school = Auth::user()->school;
        
        $justification = AbsenceJustification::where('school_id', $school->id)
            ->findOrFail($id);

        // Update absences to link them to this justification
        Absence::whereIn('id', $request->absence_ids)
            ->where('school_id', $school->id)
            ->update([
                'justification_id' => $justification->id,
                'is_justified' => true,
            ]);

        return back()->with('success', 'Justification applied to selected absences.');
    }

    public function removeFromAbsences(Request $request, $id)
    {
        $request->validate([
            'absence_ids' => 'required|array',
            'absence_ids.*' => 'exists:absences,id',
        ]);

        $school = Auth::user()->school;
        
        $justification = AbsenceJustification::where('school_id', $school->id)
            ->findOrFail($id);

        // Remove justification from absences
        Absence::whereIn('id', $request->absence_ids)
            ->where('school_id', $school->id)
            ->where('justification_id', $justification->id)
            ->update([
                'justification_id' => null,
                'is_justified' => false,
            ]);

        return back()->with('success', 'Justification removed from selected absences.');
    }
}
