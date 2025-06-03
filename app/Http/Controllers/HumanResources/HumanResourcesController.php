<?php

namespace App\Http\Controllers\HumanResources;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Account;
use App\Models\School;
use App\Models\TeacherType;
use App\Models\PlatformRole;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;


class HumanResourcesController extends Controller
{
   
    public function index()
{
    $school = School::where('school_key', Auth::user()->school_key)->first();

    if (!$school) {
        abort(404, 'School not found');
    }

    // Get all user_keys from accounts linked to this school
    $userKeys = Account::where('school_key', $school->school_key)
                       ->pluck('user_key');  // Collection of user_keys

    // Fetch users whose user_key is in $userKeys and role_id is NOT 1
    $users = User::whereIn('user_key', $userKeys)
                 ->where('role_id', '!=', 1)  // use where('role_id', '!=', 1) to exclude role_id 1
                 ->with('role')
                 ->get();

    return Inertia::render('admin/HumanResources/HumanResources', [
        'users' => $users,
    ]);
}


    public function absenceManager()
    {
        $school = School::where('school_key', Auth::user()->school_key)->first();

        // Get all user_keys from accounts linked to this school
        $userKeys = Account::where('school_key', $school->school_key)
                        ->pluck('user_key');  // returns a collection of user_keys

        $users = User::whereIn('user_key', $userKeys)  // filter users with those user_keys
                    ->where('role_id', 2)            // role = 2 (absence manager)
                    ->with('role')
                    ->get();

        return Inertia::render('admin/HumanResources/AbsenceManagers', [
            'users' => $users,
            'school'=> $school
        ]);
    }


    public function teacher()
    {
        $school = School::where('school_key', Auth::user()->school_key)->first();

        // Get all user_keys from accounts linked to this school
        $userKeys = Account::where('school_key', $school->school_key)
                           ->pluck('user_key');  // returns a collection of user_keys
    
        $users = User::whereIn('user_key', $userKeys)  // filter users with those user_keys
                     ->where('role_id', 3)            
                     ->with('role')
                     ->get();
    
        return Inertia::render('admin/HumanResources/Teachers', [
            'users' => $users,
        ]);
        
    }
    
    public function create($role = null)
    {
        $teacher_type=TeacherType::all();
        return Inertia::render('Forms/AddForms/AddUser', [
            'selectedRole' => $role,
            'teacher'=>$teacher_type
        ]);
    }

    



    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'gender' => 'required|in:Male,Female',
            'user_key' => 'required|string|unique:users,user_key',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|string',
            'password' => 'required|string|min:8',
            'phone_number' => 'nullable|string|max:20',
        ]);
    
        // Check if account already exists
        if (Account::where('user_key', $request->user_key)->exists()) {
            return redirect()->back()->with('error', 'An account already exists for this user.');
        }

        // Create user
        User::create([
            'full_name' => $request->full_name,
            'birth_date' => $request->birth_date,
            'gender' => $request->gender,
            'user_key' => $request->user_key,
            'email' => $request->email,
            'role_id' => $request->role,
            'phone_number' => $request->phone_number,
        ]);
        $type = $request->teacher_type? $request->teacher_type : null ;
    
        // Create account
        Account::create([
            'school_key' => Auth::user()->school_key,
            'user_key' => $request->user_key,
            'teacher_type_id' =>  $type , // Optional logic
            'password' => Hash::make($request->password),
            'original_password' => $request->password,
        ]);
    
        return redirect()->back()->with('success', 'User added successfully');
    }
    public function edit($user_key)
    {
        $user = User::with('role')->where('user_key', $user_key)->firstOrFail();
        $teacher_type=TeacherType::all();
        $account=Account::where('user_key', $user_key)->firstOrFail();
        return Inertia::render('Forms/EditForms/EditUser', [
            'user' => $user,
            'teacher'=>$teacher_type,
            'account'=>$account
        ]);
    }
    
    public function update(Request $request, $user_key)
    {
        // Validate input
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'birth_date' => ['required', 'date'],
            'gender' => ['required', Rule::in(['Male', 'Female'])],
            'user_key' => ['required', 'string'],
            'email' => ['required', 'email', 'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'],
            'password' => ['required', 'string', 'min:8'],
            'phone_number' => ['nullable', 'regex:/^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/'],
            'role' => ['required', Rule::in(['2', '3'])],
            'type' => ['nullable'],
        ]);

        // Find the user
        $user = User::where('user_key', $user_key)->firstOrFail();
        $account=Account::where('user_key', $user_key)->firstOrFail();

        // Update user fields
        $user->full_name = $validated['full_name'];
        $user->birth_date = $validated['birth_date'];
        $user->gender = $validated['gender'];
        $user->email = $validated['email'];
        $user->phone_number = $validated['phone_number'] ?? null;
        $user->role_id = $validated['role'];
        $user->save();

        $account->password = Hash::make($validated['password']);
        $account->original_password = $validated['password'];
        $account->teacher_type_id = $validated['type'] ;
        $account->save();

        return redirect('/humanResources')->with('success', 'User updated successfully.');
    }


    

public function destroy($user_key)
{
    $user = User::where('user_key', $user_key)->first();

    if (!$user) {
        return back()->with('error', 'المستخدم غير موجود');
    }

    Account::where('user_key', $user->user_key)->delete();

    $user->delete();

    return back()->with('success', 'تم حذف المستخدم والحسابات المرتبطة به بنجاح.');
}

    
}

