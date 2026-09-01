<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePermissionRequest;
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

    public function store(StorePermissionRequest $request){
        $data = $request->all();
        try{
            $permission = Permission::create([
                "name" => $data["permission_name"],
                "guard_name" => $data["guard_name"]
            ]);
        }catch(\Exception $e){
            return response()->json([
                "error"=> $e->getMessage()
            ], 500);
        }

        return response()->json([
            "success"=> true,
        ], 200);
    }

    public function getPermission($id){
        $permission = Permission::find($id);
        return response()->json([
            "permission_name" => $permission->name,
            "guard_name" => $permission->guard_name
        ], 200);
    }

    public function deletePermission(Request $request){
        $ids = $request->input('ids');
        foreach($ids as $id){
            try{
                Permission::findOrFail($id)->delete();
            }catch(\Exception $e){
                return response()->json([
                    "error" => $e->getMessage()
                ], 500);
            }
        }

        return response()->json([
            "success"=> true,
        ], 200);
    }
}
