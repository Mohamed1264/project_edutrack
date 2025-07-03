<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AbsenceController extends Controller
{
    public function index($id)
{
    // Fetch the group with its structure instance and active students
    $group = Group::with(['structureInstance', 'activeStudents.student.user'])
        ->where('id', $id)
        ->firstOrFail();

    // Transform the group into the desired shape
    $students = $group->activeStudents->map(function ($path) {
        $account = $path->student;
        return [
            'id' => $account->id,
            'name' => $account->user->full_name ?? null,
            'user_key' => $account->user_key,
            'email' => $account->user->email ?? null,
        ];
    });

    $groupData = [
        'id' => $group->id,
        'name' => $group->structureInstance->name ?? null,
        'students' => $students,
    ];

    return Inertia::render('Teacher/TakeAbsence', [
        'initialGroup' => $groupData,
    ]);
}

}
