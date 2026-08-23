<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/login', [AuthController::class,'index'])->name('login');
Route::post('/auth/login', [AuthController::class,'login']);

Route::middleware('auth')->group(function () {
    Route::get('/', [AuthController::class,'home']);
});

require __DIR__.'/settings.php';
