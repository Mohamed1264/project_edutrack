<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Configuration\ConfigurationController;
use App\Http\Controllers\Configuration\SchoolYearController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Configuration\SchoolWorkingDayController;
use App\Http\Controllers\Configuration\TimeSlotsController;
use App\Http\Controllers\Schedules\ScheduleController;
use App\Http\Controllers\Preferences\PreserencesController;
use App\Http\Controllers\HumanResources\AbsenceManagerController;
use App\Http\Middleware\Authenticate;
use App\Http\Middleware\CheckRole;
use App\Http\Middleware\RedirectTo;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HumanResources\HumanResourcesController;
use App\Http\Controllers\JustificationAbsenceController;
use App\Http\Controllers\AbsenceListController;


// Public routes - no middleware
Route::middleware([RedirectTo::class])->group(function (){
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    
});

Route::get('/', function(){
    return redirect()->route('login');
});

// Protected routes by role
Route::middleware([Authenticate::class, CheckRole::class.':Admin'])->group(function() {
    Route::get('/admin', [DashboardController::class , 'adminDashboard'])->name('admin.dashboard');
    Route::inertia('/profile', 'admin/Profile')->name('admin.profile');
    Route::inertia('/humanResources', 'admin/Indexes/HumanRessources')->name('humanResources');
    Route::prefix('humanResources')->group(function(){
        Route::get('/', [HumanResourcesController::class, 'index'])->name('humanResources');
        Route::get('/absenceManagers', [HumanResourcesController::class, 'absenceManager'])->name('admin.humanResources.absenceManager');
        Route::get('/teachers', [HumanResourcesController::class, 'teacher'])->name('admin.humanResources.teacher');
    
        Route::get('/create/{role?}', [HumanResourcesController::class, 'create'])->name('admin.humanResources.create');
        Route::post('/', [HumanResourcesController::class, 'store'])->name('admin.humanResources.store');
        Route::get('/{user_key}/edit', [HumanResourcesController::class, 'edit'])->name('admin.humanResources.edit');
        Route::put('/{user_key}', [HumanResourcesController::class, 'update'])->name('admin.humanResources.update');
        Route::delete('/{user_key}/destroy', [HumanResourcesController::class, 'destroy'])->name('admin.humanResources.destroy');
    });

  

    Route::prefix('configuration')->group(function (){
        Route::get('/', [ConfigurationController::class,'showConfiguration'])->name('configuration');
        Route::get('/schoolYears/create', [SchoolYearController::class , 'create'])->name('configuration.school.years.create');
        Route::post('/workingDays', [SchoolWorkingDayController::class,'save'])->name('working.days.save');
        Route::post('/timeSlots', [TimeSlotsController::class,'save'])->name('time.slots.save');
        Route::delete('/timeSlots', [TimeSlotsController::class,'delete'])->name('time_slots.delete');
    });


    Route::prefix('schoolResources')->group(function () {
        Route::inertia('/', 'admin/SchoolsResources/SchoolResources')->name('schoolResources');

        Route::inertia('/groups', 'admin/SchoolsResources/Groups/Groups')->name('schoolResources.groups');
        Route::inertia('/levels', 'admin/SchoolsResources/Levels/Levels')->name('schoolResources.levels');
        Route::inertia('/years', 'admin/SchoolsResources/Years/Years')->name('schoolResources.years');
        Route::inertia('/options', 'admin/SchoolsResources/Options/Options')->name('schoolResources.options');
        Route::inertia('/fields', 'admin/SchoolsResources/Filieres/Filieres')->name('schoolResources.fields');

        Route::inertia('/schedules', 'admin/SchoolsResources/Schedules/schedulePages/Home')->name('schoolResources.schedules.index');
        Route::get('/schedules/{type}', [ScheduleController::class ,'showSchedulesList'])->name('schoolResources.schedules.list');
        Route::get('/schedules/{type}/{id}', [ScheduleController::class ,'show'])->name('schoolResources.schedules.schedule');
        Route::post('/schedules/{type}/{id}', [ScheduleController::class ,'clearSchedule'])->name('schoolResources.schedules.schedule.clear');
        Route::get('/schedules/{type}/{id}/availability', [ScheduleController::class, 'getAvailability'])->name('schedules.availability');
        Route::post('/schedules/save', [ScheduleController::class, 'save'])->name('schedules.save');

        Route::inertia('/rooms', 'admin/SchoolsResources/Rooms')->name('schoolResources.rooms');

        Route::inertia('/progress', 'admin/SchoolsResources/Progress/Progress')->name('schoolResources.progress.index');

        // Route::inertia('/options', 'admin/Indexes/SchoolRessources')->name('schoolResources.options');
        // Route::inertia('/levels', 'admin/Indexes/SchoolRessources')->name('schoolResources.levels');
    });
    Route::inertia('/archive', 'admin/Indexes/History')->name('archive');

});

Route::middleware([Authenticate::class, CheckRole::class . ':Absence Manager'])->group(function () {

    Route::get('/absenceManager', [DashboardController::class, 'absenceManagerDashBoard'])->name('absenceManager.dashboard');

    Route::get('/students', [AbsenceManagerController::class, 'student'])->name('students');
    Route::get('/students/addStudent', [AbsenceManagerController::class, 'create'])->name('students.create');
    Route::get('/students/addStudent/more', [AbsenceManagerController::class, 'createMore'])->name('students.create');
    Route::post('/students', [AbsenceManagerController::class, 'store'])->name('students.store');

    Route::prefix('students')->name('students.')->group(function () {
        Route::get('{user_key}/edit', [AbsenceManagerController::class, 'edit'])->name('editStudent');
        Route::put('{user_key}', [AbsenceManagerController::class, 'update'])->name('updateStudent');
        Route::get('{user_key}', [AbsenceManagerController::class, 'show'])->name('showStudent');
        Route::delete('{user_key}', [AbsenceManagerController::class, 'destroy'])->name('destroy');
    });

    Route::get('/justification', [JustificationAbsenceController::class, 'index'])->name('justification');
    Route::get('/justify/{ids}/{justif}', [JustificationAbsenceController::class, 'confirm'])->name('ConfirmJustification');




    Route::get('/absence/lists', [AbsenceListController::class, 'index'])->name('absence.lists');
    Route::get('/schedules/lists', [DashboardController::class, 'absenceManagerDashBoard'])->name('schedules.lists');
});



Route::middleware([Authenticate::class, CheckRole::class.':Teacher'])->group(function() {
    Route::get('/teacher',[DashboardController::class,'teacherDashboard'])->name('teacher.dashboard');
    Route::inertia('/takeAbsence/{id}', 'Teacher/TakeAbsence')->name('teacher.takeAbsence');
    Route::inertia('/updateAbsence/{id}', 'Teacher/ListAbsence2')->name('teacher.updateAbsence');
    Route::inertia('/schedule/archive/teachers/{id?}', 'Teacher/Dashboard')->name('teacher.archive');
    Route::inertia('/progress/teachers/{id?}', 'Teacher/Dashboard')->name('teacher.progress');

});

Route::middleware([Authenticate::class, CheckRole::class.':Student'])->group(function() {
    Route::inertia('/student', 'Student/Dashboard')->name('student.dashboard');
    Route::inertia('/student/profile', 'Student/Dashboard')->name('student.profile');
    Route::inertia('/student/absence/history/{id}', 'Student/Dashboard')->name('student.absence.history');
    Route::inertia('/student/courses', 'Student/Dashboard')->name('student.courses');
});

// Shared authenticated routes (like logout)
Route::middleware([Authenticate::class])->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/changeTheme', [PreserencesController::class, 'changeTheme']);
});

