<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\SchoolStructureInstance;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;

class OptionController extends Controller
{
public function index()
{
    $options = SchoolStructureInstance::with(['parent.parent.parent']) // Option -> Year -> Field -> Level
        ->where('school_structure_unit_id', 4) // 4 = Options
        ->get();
        
    return Inertia::render('admin/SchoolsResources/Options/Options', [
        'options' => $options,
        'status' => session('status'),
    ]);
}
    public function create()
    {
        $niveaux = SchoolStructureInstance::whereNull('parent_id')->get(['id', 'name']);
        $filieres = SchoolStructureInstance::whereNotNull('parent_id')
        ->where('school_structure_unit_id', 2)
        ->get(['id','parent_id', 'name']);
        
        $years = SchoolStructureInstance::whereNotNull('parent_id')
            ->where('school_structure_unit_id', 3)
            ->get(['id','parent_id','name']);

        return Inertia::render('Forms/AddForms/AddOption', compact('filieres', 'years','niveaux'));
    }
    
   public function store(Request $request)
{
    $validated = $request->validate([
        'libel' => 'required|string',
        'filiere' => 'required|exists:school_structure_instances,id',
        'year' => 'required|exists:school_structure_instances,id',
        'option' => 'nullable|exists:school_structure_instances,id',
    ]);

    // Create structure instance (DEV101)
    $instance = SchoolStructureInstance::create([
        'name' => $validated['libel'],
        'parent_id' => $validated['year'], 
        'school_id' => auth()->school_id ?? 1,
        'school_structure_unit_id' => 4, // 'Options'
    ]);


    return redirect()->route('schoolResources.options');
}
 public function edit($id)
    {
        $option = SchoolStructureInstance::with(['parent.parent']) // Option -> Year -> Field
            ->findOrFail($id);
            
        $years = SchoolStructureInstance::where('school_structure_unit_id', 3) // Years
            ->get(['id', 'name']);
            
        $filieres = SchoolStructureInstance::where('school_structure_unit_id', 2) // Fields
            ->get(['id', 'name']);
            
        $niveaux = SchoolStructureInstance::whereNull('parent_id')
            ->where('school_structure_unit_id', 1) // Levels
            ->get(['id', 'name']);

        return Inertia::render('Forms/EditForms/EditOption', [
            'option' => $option,
            'years' => $years,
            'filieres' => $filieres,
            'niveaux' => $niveaux,
            'currentYear' => $option->parent,
            'currentFiliere' => $option->parent->parent ?? null,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'libel' => 'required|string',
            'year' => 'required|exists:school_structure_instances,id',
            'filiere' => 'nullable|exists:school_structure_instances,id',
        ]);

        try {
            $option = SchoolStructureInstance::findOrFail($id);
            $option->update([
                'name' => $validated['libel'],
                'parent_id' => $validated['year'],
            ]);

            return Redirect::route('schoolResources.options')
                ->with('status', 'Option updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error updating option: ' . $e->getMessage())
                ->withInput();
        }
    }

    public function destroy($id)
    {
        try {
            $option = SchoolStructureInstance::findOrFail($id);
            $option->delete();

            return Redirect::route('schoolResources.options')
                ->with('status', 'Option deleted successfully');
        } catch (\Exception $e) {
            return Redirect::route('schoolResources.options')
                ->with('error', 'Error deleting option: ' . $e->getMessage());
        }
    }
}
