<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required','email'],
            'password'=> ['required'],
        ]);

        if(Auth::attempt($credentials)){
            $request->session()->regenerate();

            return response()->json([
                'message' => 'Success'
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid credentials'
        ], 422);
    }

    public function index(Request $request)
    {
        return view("auth.login");
    }

    public function home(Request $request)
    {
        return view("app");
    }
}
