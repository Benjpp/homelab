<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Permission;
use Yajra\DataTables\Facades\DataTables;

class PermissionController extends Controller
{
    public function index()
    {
        return view("config.partials.permissions");
    }

    public function getDatatable(){
        $permissions = Permission::all();

        return Datatables::of($permissions)
            ->make(true);
    }
}
