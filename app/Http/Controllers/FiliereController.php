<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SchoolStructureInstance;
use Inertia\Inertia;

class FiliereController extends Controller
{
    public function index()
    {
        $filieres = SchoolStructureInstance::with('parent')
            ->whereNotNull('parent_id')
            ->where('school_structure_unit_id', 2)
            ->get();

        return Inertia::render('admin/SchoolsResources/Filieres/Filieres', compact('filieres'));
    }

    public function create()
    {
        $niveaux = SchoolStructureInstance::whereNull('parent_id')->get(['id', 'name']);
        $filieres = SchoolStructureInstance::whereNotNull('parent_id')
        ->where('school_structure_unit_id', 2)
        ->get(['id', 'name']);
    
    $years = SchoolStructureInstance::whereNotNull('parent_id')
        ->where('school_structure_unit_id', 3)
        ->get(['id', 'name']);
        return Inertia::render('Forms/AddForms/AddFiliere', compact('filieres', 'years','niveaux'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'libel' => 'required|string',
            'niveau' => 'required|exists:school_structure_instances,id',
        ]);

        SchoolStructureInstance::create([
            'name' => $validated['libel'],
            'parent_id' => $validated['niveau'],
            'school_id' => auth()->school_id ?? 1, // adjust if needed
            'school_structure_unit_id' => 2 // change to match your logic
        ]);

        return redirect()->route('schoolResources.fields');
    }

    public function show(SchoolStructureInstance $filiere)
    {
        return Inertia::render('admin/SchoolsResources/Filieres/ProfileFiliere', [
            'filiere' => $filiere->load('parent')
        ]);
    }

   public function edit($id)
{
    $filiere = SchoolStructureInstance::findOrFail($id);
    $niveaux = SchoolStructureInstance::whereNull('parent_id')->get(['id', 'name']);

    return Inertia::render('Forms/EditForms/EditFiliere', compact('filiere', 'niveaux'));
}


    public function update(Request $request, SchoolStructureInstance $filiere)
    {
        $validated = $request->validate([
            'libel' => 'required|string',
            'niveau' => 'required|exists:school_structure_instances,id',
            'numberGroup' => 'nullable|integer',
            'totalAbsence' => 'nullable|integer',
        ]);

        $filiere->update([
            'name' => $validated['libel'],
            'parent_id' => $validated['niveau'],
            'numberGroup' => $validated['numberGroup'] ?? $filiere->numberGroup,
            'totalAbsence' => $validated['totalAbsence'] ?? $filiere->totalAbsence,
        ]);

        return redirect()->route('schoolResources.fields')->with('toastMessage', 'Filiere updated successfully!');
    }

    public function destroy(SchoolStructureInstance $filiere)
    {
        try {
            $group->delete();
            return redirect()->route('schoolResources.fields')->with('toastMessage', 'Filiere deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->route('schoolResources.fields')->with('toastMessage', 'Filiere could not be deleted.');
        }  
    }
}
