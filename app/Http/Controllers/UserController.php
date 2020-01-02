<?php

namespace App\Http\Controllers;

use App\User;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function showOneUser($id)
    {
        $user = User::find($id);
        return response()->json($user);
    }
}
