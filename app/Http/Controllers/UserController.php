<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function insertUser(Request $request)
    {
        DB::transaction(function () use ($request) {

            $userId = User::max('id') + 1;
            $name = ($request->firstName) . " " . ($request->familyName);

            DB::insert('INSERT INTO users (id, name,firstname,lastname,gender,email,created_at,password)
            VALUES (?,?,?,?,?,?,now(),?)', [
                $userId, $name, $request->firstName, $request->familyName,
                $request->userGender, $request->email, 'notManagedYet'
            ]);

            foreach ($request->state["checked"] as $skillId) {

                DB::insert('INSERT INTO childskill_user (user_id, childskill_id)
                    VALUES (?,?)', [$userId, $skillId]);
            }
        });
    }
}
