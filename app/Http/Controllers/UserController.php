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

    public function updateUserProfile(Request $request)
    {
        $user = Auth::user();
        $input = [
            'gender' => $request->state["gender"],
            'phone' => $request->state["phone"],
            'firstname' => $request->state["fields"]["firstname"],
            'lastname' => $request->state["fields"]["lastname"],
            'email' => $request->state["fields"]["email"],
            'dob' => $request->state["fields"]["dob"],
            'shadow' => $request->state["checkbox"]["shadow"],
            'mentor' => $request->state["checkbox"]["mentor"],
            'host' => $request->state["checkbox"]["host"],
        ];
        $filteredInput = array_filter(
            $input, 
            function($v){
                return ! is_null($v);
            }
        );
        $user->update($filteredInput);
        $user->update([
            'name' => $user->firstname.' '.$user->lastname
        ]);
        $selected = $request->state["selected"];
        $selectedSkills = [];
        if ($selected) {
            foreach ($selected as $skill) {
                $selectedSkills[] = $skill["value"];
            }
        }
        
        $data = $this->updateUserSkills($user, $selectedSkills);
        $userId = Auth::id();
        $userWithSkills = User::where('id', $userId)->with('childskills')->first();
        return response()->json($userWithSkills);
    }

    public function updateUserSkills($user, $selectedSkills)
    {
        $skillId = $selectedSkills;
        $user->childskills()->sync($skillId, false);
        return $selectedSkills;
    }
}
