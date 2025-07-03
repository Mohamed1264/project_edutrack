<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Models\TimeSlot;
use App\Models\WeekDay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class ExportController extends Controller
{
    /**
     * Export the full weekly schedule for the authenticated user's school as JSON.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function scheduleExport(Request $request)
    {
        $user = Auth::user();
        if (!$user || !$user->school) {
            return response()->json([
                'message' => 'User not authenticated or school not found.'
            ], 401);
        }
        $school = $user->school;
// Fetch sessions (time slots) from DB
        $sessions = TimeSlot::select('start_time as start', 'end_time as end')
        ->where('school_id', $school->id)
        ->get();

        // Fetch days from DB
        $days = WeekDay::pluck('day_name');
        // Fetch full weekly schedule for the current school
        $schedule = Schedule::with(['group', 'room', 'teacher'])
            ->where('school_id', $school->id)
            ->get()
            ->map(function ($s,$i) {
                $days[$i];
                return [
                    'day_of_week' => $s->day_of_week,
                    'start_time' => $s->start_time,
                    'end_time' => $s->end_time,
                    'group_name' => $s->group->name ?? '',
                    'room_name' => $s->room->name ?? null,
                ];
            });

        

        return response()->json([
            'schedule' => $schedule,
            'days' => $days,
            'sessions' => $sessions,
            'entityName' => $school->name,
            'entity' => 'school',
            'numberHours' => $schedule->count() * 2, // example: 2 hours per session
            'item' => [
                'gender' => $user->gender ?? 'Male' // Use user's gender if available
            ]
        ]);
    }
}
