<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Roles;
use Yajra\DataTables\Facades\DataTables;

class RoleController extends Controller
{
    public function index()
    {
        return view("config.partials.roles");
    }

    public function getDatatable(){
        $roles = Roles::all();

        return Datatables::of($roles)
            ->make(true);
    }

    public function store()
    {
        
    }
}
