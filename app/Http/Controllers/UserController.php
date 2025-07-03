<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Account;
class UserController extends Controller
{
    public function profile()
    {
        $role = Auth::user()->role;
        $role = strtolower($role);
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => 'User not authenticated.'
            ], 401);
        }
        $user = User::where('user_key',$user->user_key)->first();

        // Return user info as JSON
        return Inertia::render('common/UserProfile', [
            'user' => $user,
            'role' => $role,
        ]);
    }
}
