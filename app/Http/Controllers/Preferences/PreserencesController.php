<?php

namespace App\Http\Controllers\Preferences;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PreserencesController extends Controller
{
    public function changeTheme (Request $request) {
        $newTheme  = $request->theme;
        return back()->withCookie(cookie('theme', $newTheme, 525600));
    }
}
