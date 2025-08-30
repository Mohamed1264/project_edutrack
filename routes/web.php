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
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\AbsenceController;

use App\Http\Controllers\FiliereController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\OptionController;

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

        
        Route::get('/levels',  [LevelController::class,'index'])->name('schoolResources.levels');
        Route::get('/addLevel', [LevelController::class,'create'])->name('schoolResources.addLevel'); 
        Route::post('/levels', [LevelController::class, 'store'])->name('schoolResources.levels.store');
        Route::get('/levels/{level}', [LevelController::class, 'show'])->name('schoolResources.levels.show');
        Route::get('/levels/{level}/edit', [LevelController::class, 'edit'])->name('schoolResources.levels.edit');
        Route::put('/levels/{level}', [LevelController::class, 'update'])->name('schoolResources.levels.update');
        Route::delete('/levels/{level}', [LevelController::class, 'destroy'])->name('schoolResources.levels.destroy');


        
        Route::get('/fields', [FiliereController::class,'index'])->name('schoolResources.fields');
        Route::get('/addField', [FiliereController::class, 'create'])->name('schoolResources.addField');
        Route::post('/fields', [FiliereController::class, 'store'])->name('schoolResources.fields.store');
        Route::get('/fields/{filiere}', [FiliereController::class, 'show'])->name('schoolResources.fields.show');
        Route::get('/fields/{filiere}/edit', [FiliereController::class, 'edit'])->name('schoolResources.fields.edit');
        Route::put('/fields/{filiere}', [FiliereController::class, 'update'])->name('schoolResources.fields.update');
        Route::delete('/fields/{filiere}', [FiliereController::class, 'destroy'])->name('schoolResources.fields.destroy');

        Route::get('/addGroup', [GroupController::class, 'create'])->name('schoolResources.addGroup');
        Route::post('/groups/add', [GroupController::class, 'store'])->name('groups.store');

        Route::get('/groups', [GroupController::class,'index'])->name('schoolResources.groups');
        Route::get('/groups/{group}', [GroupController::class, 'show'])->name('groups.show');
        Route::get('/groups/{group}/edit', [GroupController::class, 'edit'])->name('groups.edit');
        Route::put('/groups/{group}', [GroupController::class, 'update'])->name('groups.update');
        Route::delete('/groups/{group}', [GroupController::class, 'destroy'])->name('schoolResources.groups.destroy');
        

        Route::inertia('/schedules', 'admin/SchoolsResources/Schedules/schedulePages/Home')->name('schoolResources.schedules.index');
        Route::get('/schedules/{type}', [ScheduleController::class ,'showSchedulesList'])->name('schoolResources.schedules.list');
        Route::get('/schedules/{type}/{id}', [ScheduleController::class ,'show'])->name('schoolResources.schedules.schedule');
        Route::post('/schedules/{type}/{id}', [ScheduleController::class ,'clearSchedule'])->name('schoolResources.schedules.schedule.clear');
        Route::get('/schedules/{type}/{id}/availability', [ScheduleController::class, 'getAvailability'])->name('schedules.availability');
        Route::post('/schedules/save', [ScheduleController::class, 'save'])->name('schedules.save');

        Route::get('/rooms', [RoomController::class,'index'])->name('schoolResources.rooms');
        Route::get('/addRoom', [RoomController::class, 'create'])->name('schoolResources.addRoom');
        Route::post('/rooms/add', [RoomController::class, 'store'])->name('rooms.store');
        Route::get('/rooms/{room}/edit', [RoomController::class, 'edit'])->name('rooms.edit');
        Route::put('/rooms/{room}', [RoomController::class, 'update'])->name('room.update');
        Route::delete('/rooms/{room}', [RoomController::class, 'destroy'])->name('schoolResources.rooms.destroy');
        


        Route::inertia('/progress', 'admin/SchoolsResources/Progress/Progress')->name('schoolResources.progress.index');

        Route::post('/export', [ExportController::class, 'scheduleExport'])->name('ExportSchedule');

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


    Route::get('/absence/lists', [AbsenceListController::class, 'index'])->name('absence');
    Route::get('/absenceListes/{id}', [AbsenceListController::class, 'group'])->name('absence.group');
    Route::get('/absenceListe/{id_group}', [AbsenceListController::class, 'list']);


    Route::get('/schedules/lists', [DashboardController::class, 'absenceManagerDashBoard'])->name('schedules.lists');
});

      

Route::middleware([Authenticate::class, CheckRole::class.':Teacher'])->group(function() {
    Route::get('/teacher',[DashboardController::class,'teacherDashboard'])->name('teacher.dashboard');
    Route::get('/takeAbsence/{id}',[AbsenceController::class,'index'])->name('teacher.takeAbsence');
    Route::inertia('/updateAbsence/{id}', 'Teacher/ListAbsence2')->name('teacher.updateAbsence');
    Route::inertia('/schedule/archive/teachers/{id?}', 'Teacher/Dashboard')->name('teacher.archive');
    Route::inertia('/progress/teachers/{id?}', 'Teacher/Dashboard')->name('teacher.progress');
// routes/web.php
Route::post('/absences', [AbsenceController::class, 'store']);
});    


    Route::get('/profile/{id}', [UserController::class, 'profile'])->name('profile');
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

