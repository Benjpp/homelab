<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\EditUserRequest;
use App\Models\User;
use App\Models\Permission;
use Yajra\DataTables\Facades\DataTables;

class UserController extends Controller
{
    public function index()
    {
        return view("config.partials.users");
    }

    public function getDatatable()
    {
        $users = User::all();
        
        return Datatables::of($users)
            ->make(true);
    }

    public function store(StoreUserRequest $storeUserRequest)
    {
        $data = $storeUserRequest->all();
        $user = null;
        try{
            $user = User::create([
                "name"=> $data["user_name"],
                "email" => $data["email"],
                "password" => $data["password"],
            ]);
        }catch(\Exception $e){
            return response()->json([
                "error"=> $e->getMessage()
            ], 200);
        }

        $permissions = $data["permissions"];

        if(is_string($permissions)){
            $permission = Permission::findOrFail($permissions);
            $user->givePermissionTo($permission->name);
        }else{
            foreach($permissions as $id){
                $permission = Permission::findOrFail($id);
                $user->givePermissionTo($permission->name);
            }
        }

        return response()->json([
            "success" => true
        ], 200);
    }

    public function getUser($id)
    {
        $user = User::find($id);
        return response()->json([
            "user_name" => $user->name,
            "email" => $user->email,
        ], 200);
    }

    public function getPermissionsNot($id)
    {
        $user = User::find($id);
        $permissions = $user->permissions()->pluck("name");
        $permissionsNot = Permission::whereNotIn("name", $permissions)->get(['id', 'name']);

        return response()->json($permissionsNot, 200);
    }

    public function edit(EditUserRequest $storeUserRequest, $id)
    {
        $data = $storeUserRequest->all();
        $user = null;
        try{
            $user = User::find($id);
            $user->update([
                "name" => $data["user_name"],
                "email" => $data["email"]
            ]);
        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage()
            ], 500);
        }

        $permissions = $data["permissions"];
        
        if(is_string($permissions)){
            $permission = Permission::findOrFail($permissions);
            $user->givePermissionTo($permission->name);
        }else{
            foreach($permissions as $id){
                $permission = Permission::findOrFail($id);
                $user->givePermissionTo($permission->name);
            }
        }

        return response()->json([
            "success" => true
        ], 200);    
    }
}