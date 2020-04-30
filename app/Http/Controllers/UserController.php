<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public $successStatus = 200;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function showUserSkills()
    {
        $user = Auth::user();
        $userSkills = [];

        foreach ($user->childskills as $childskill) {
            $userSkills[] = $childskill;
        }
        return response()->json($userSkills);
    }

    /** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */
    public function details()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this->successStatus);
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

    public function updateUserSkills(Request $request)
    {
        $user = Auth::user();
        $skillId = $request->state["checked"];
        $user->childskills()->sync($skillId, false);
        $data = $request->all();
        return response()->json($data);
    }
}
