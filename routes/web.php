<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\PermissionController;
use App\Http\Controllers\User\RoleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Home\HomeController;

Route::get('/login', [AuthController::class,'index'])->name('login');
Route::post('/auth/login', [AuthController::class,'login']);

Route::middleware('auth')->group(function () {
    Route::get('/', [AuthController::class,'home']);

    Route::controller(HomeController::class)->group(function () {
        Route::get('/config', 'configIndex');
    });

    Route::middleware('can:user.index')->group(function () {
        Route::controller(UserController::class)->group(function () {
            Route::get('/user', 'index');
            Route::get('/user/getDatatable', 'getDatatable');
        });
    });

    Route::middleware('can:permission.index')->group(function () {
        Route::controller(PermissionController::class)->group(function () {
            Route::get('/permission', 'index');
            Route::get('/permission/getDatatable', 'getDatatable');
        });
    });

    Route::middleware('can:role.index')->group(function () {
        Route::controller(RoleController::class)->group(function () {
            Route::get('/role', 'index');
            Route::get('/role/getDatatable', 'getDatatable');

            Route::get('/role/store', 'store')->middleware('can:role.edit');
        });
    });
});

require __DIR__.'/settings.php';
