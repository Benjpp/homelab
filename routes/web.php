<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CloudStorage\CloudStorageController;
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
        Route::get('/cloud-storage', 'cloudStorageIndex');
    });

    Route::middleware('can:user.index')->group(function () {
        Route::controller(UserController::class)->group(function () {
            Route::get('/user', 'index');
            Route::get('/user/getDatatable', 'getDatatable');
            Route::get('/user/permissions/not/{id}', 'getPermissionsNot');

            Route::post('/user/store', 'store')->middleware('can:user.edit');
            Route::put('/user/edit/{id}', 'edit')->middleware('can:user.edit');
            Route::get('/user/get/{id}', 'getUser');
            Route::delete('/user/delete', 'deleteUser')->middleware('can:user.edit');
        });
    });

    Route::middleware('can:permission.index')->group(function () {
        Route::controller(PermissionController::class)->group(function () {
            Route::get('/permission', 'index');
            Route::get('/permission/getDatatable', 'getDatatable');

            Route::post('/permission/store', 'store')->middleware('can:permission.edit');
            Route::get('/permission/get/{id}', 'getPermission');
            Route::get('/permission/all', 'getPermissions');
            Route::delete('/permission/dt/delete', 'deletePermission')->middleware('can:permission.edit');
        });
    });

    Route::middleware('can:role.index')->group(function () {
        Route::controller(RoleController::class)->group(function () {
            Route::get('/role', 'index');
            Route::get('/role/getDatatable', 'getDatatable');

            Route::get('/role/store', 'store')->middleware('can:role.edit');
        });
    });

    Route::middleware('can:cloud-storage.index')->group(function () {
        Route::controller(CloudStorageController::class)->group(function () {
            Route::get('/cloud-storage/getDatatable', 'getDatatable');
            Route::post('/cloud-storage/upload/file', 'uploadFile');
            Route::post('/cloud-storage/create/dir', 'createDirectory');
        });
    });
});

require __DIR__.'/settings.php';
