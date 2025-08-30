<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SchoolStructureInstance;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $levels = SchoolStructureInstance::with('parent')
            ->whereNull('parent_id')
            ->where('school_structure_unit_id', 1) // 1 = Levels
            ->get();
            
        return Inertia::render('admin/SchoolsResources/Levels/Levels', [
            'levels' => $levels,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
public function create()
    {
        return Inertia::render('Forms/AddForms/AddLevel');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
        'libel' => 'required|string',
    ]);   

    // Create structure instance (DEV101)
    $instance = SchoolStructureInstance::create([
        'name' => $validated['libel'],
        'parent_id' => null, // No parent for levels
        'school_id' => auth()->school_id ?? 1,
        'school_structure_unit_id' => 1, // 'level'
    ]);


    return redirect()->route('schoolResources.levels');
    }
    /**
     * Display the specified resource.
     */
    public function show(SchoolStructureInstance $level)
    {
        return Inertia::render('admin/SchoolsResources/Levels/Show', [
            'level' => $level->load('parent'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
  public function edit(SchoolStructureInstance $level)
{
    return Inertia::render('Forms/EditForms/EditLevel', [
        'level' => $level
    ]);
}

public function update(Request $request, SchoolStructureInstance $level)
{
    $validated = $request->validate([
        'libel' => 'required|string|max:255'
    ]);

    $level->update(['name' => $validated['libel']]);

    return redirect()->route('schoolResources.levels')
        ->with('success', 'Level updated successfully');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SchoolStructureInstance $level)
    {
        $level->delete();
        
        return Redirect::route('schoolResources.levels')
        ->with('success', 'Level deleted successfully');
    }
}