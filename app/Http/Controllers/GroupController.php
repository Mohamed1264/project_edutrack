<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\School;

use App\Models\SchoolStructureInstance;
use Inertia\Inertia;

class GroupController extends Controller
{
    public function index()
    {
    $groups = Group::with('parent')
            ->get();
     
    $filieres = SchoolStructureInstance::whereNotNull('parent_id')
        ->where('school_structure_unit_id', 2)
        ->firstOrFail();
    
   
        return Inertia::render('admin/SchoolsResources/Groups/Groups', compact('groups', 'filieres'));
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
    $options = SchoolStructureInstance::whereNotNull('parent_id')
        ->where('school_structure_unit_id', 4)
        ->get(['id','parent_id', 'name']);
        return Inertia::render('Forms/AddForms/AddGroup', compact('filieres', 'years','niveaux','options'));
    }
   

   public function store(Request $request)
{
    $validated = $request->validate([
        'libel' => 'required|string',
        'filiere' => 'required|exists:school_structure_instances,id',
        'type' => 'required|string',
        ]);

    // Create structure instance (DEV101)
    $instance = SchoolStructureInstance::create([
        'name' => $validated['libel'],
        'parent_id' => $validated['filiere'], 
        'school_id' => auth()->school_id ?? 1,
        'school_structure_unit_id' => 5, // 'Groups'
    ]);
    $group= Group::create([
        'school_structure_unit_id'=> $instance['id'],
        'type'=> $validated['type'],
        'school_id'=> auth()->school_id ?? 1,    
    ]);


    return redirect()->route('schoolResources.groups');
}


    public function show(Group $group)
    {
        return Inertia::render('admin/SchoolsResources/Groups/ProfileGroup', [
            'group' => $group->load('schoolStructureInstance.parent')
        ]);
    }

    public function edit($id)
    {
        $group = SchoolStructureInstance::with('parent')
        ->where('school_structure_unit_id', 5)
        ->where('id',$id) // Assuming 5 is the ID for 'Groups'
        ->firstOrFail();
        $dataGroup= Group::where('school_structure_unit_id',$group->school_structure_unit_id)->firstOrFail();
        $filieres = SchoolStructureInstance::whereNotNull('parent_id')
        ->where('school_structure_unit_id', 2)
        ->where('id',$group->parent_id)
        ->get();;

        return Inertia::render('Forms/EditForms/EditGroup', compact('group', 'filieres','dataGroup'));
    }

    public function update(Request $request, SchoolStructureInstance $group )
    {
        $validated = $request->validate([
            'libel' => 'required|string',
            'filiere' => 'required|exists:school_structure_instances,id',
            'type'  => 'required'
        ]);

        Group::where('school_structure_unit_id' , $group->school_structure_unit_id)
        ->update([
            'type' => $validated['type'],
        ]);
        $group->update([
            'name' => $validated['libel'],
            'parent_id' => $validated['filiere'], 
        ]);
        

        return redirect()->route('schoolResources.groups')->with('toastMessage', 'Group updated successfully!');
    }

    
    public function destroy(SchoolStructureInstance $group)
    {
        try {
            $group->delete();
            return redirect()->route('schoolResources.groups')->with('toastMessage', 'Group deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->route('schoolResources.groups')->with('toastMessage', 'Group could not be deleted.');
        }
    }
}
