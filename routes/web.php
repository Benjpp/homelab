<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\User\UserController;
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
        });
    });
});

require __DIR__.'/settings.php';
