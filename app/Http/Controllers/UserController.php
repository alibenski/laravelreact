<?php

namespace App\Http\Controllers;

use App\User;
use App\Tag;
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
        $userId = Auth::id();
        $userWithSkills = User::where('id', $userId)
            ->with('childskills')
            ->with('desiredskills')
            ->with('tagskills')
            ->with('desiredtagskills')
            ->with('stations')
            ->with('organizations')
            ->first();
        return response()->json(['success' => $userWithSkills], $this->successStatus);
    }

    public function insertUser(Request $request)
    {
        DB::transaction(function () use ($request) {

            $userId = 1;
            if (User::count() > 0) {
                $userId = User::max('id') + 1;
            }
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
            'mentee' => $request->state["checkbox"]["mentee"],
            'host' => $request->state["checkbox"]["host"],
            'volunteer' => $request->state["checkbox"]["volunteer"],
            'organization_id' => $request->state["organization"]["value"],
            'station_id' => $request->state["station"]["value"],
        ];
        $filteredInput = array_filter(
            $input,
            function ($v) {
                return !is_null($v);
            }
        );
        $user->update($filteredInput);
        $user->update([
            'name' => $user->firstname . ' ' . $user->lastname
        ]);

        $selected = $request->state["selected"];
        $selectedSkills = [];
        if ($selected) {
            foreach ($selected as $skill) {
                $selectedSkills[] = $skill["value"];
            }
        }
        $dataSkills = $this->updateUserSkills($user, $selectedSkills);

        $selectedDesired = $request->state["selectedDesired"];
        $desiredSkills = [];
        if ($selectedDesired) {
            foreach ($selectedDesired as $dskill) {
                $desiredSkills[] = $dskill["value"];
            }
        }
        $dataDesiredSkills = $this->updateDesiredUserSkills($user, $desiredSkills);

        $userId = Auth::id();
        $userWithSkills = User::where('id', $userId)
            ->with('childskills')
            ->with('desiredskills')
            ->with('tagskills')
            ->with('desiredtagskills')
            ->with('stations')
            ->with('organizations')
            ->first();
        return response()->json($userWithSkills);
    }

    public function updateUserSkills($user, $selectedSkills)
    {
        $integerSkillValue = [];
        $stringSkillValue = [];
        foreach ($selectedSkills as $skillValue) {
            if (is_int($skillValue)) {
                $integerSkillValue[] = $skillValue;
            } else {
                $stringSkillValue[] = ['skillname' => $skillValue];
            }
        }

        $skillId = $integerSkillValue;
        $user->childskills()->sync($skillId, false);

        $idTag = [];
        foreach ($stringSkillValue as $arrayValue) {
            // check if entry is duplicate before inserting
            $idTag[] = Tag::insertGetId($arrayValue);
        }

        $skillTagId = $idTag;
        $user->tagskills()->sync($skillTagId, false);

        return $selectedSkills;
    }

    public function updateDesiredUserSkills($user, $desiredSkills)
    {
        $integerDesiredSkillValue = [];
        $stringDesiredSkillValue = [];
        foreach ($desiredSkills as $desiredSkillValue) {
            if (is_int($desiredSkillValue)) {
                $integerDesiredSkillValue[] = $desiredSkillValue;
            } else {
                $stringDesiredSkillValue[] = ['skillname' => $desiredSkillValue];
            }
        }


        $skillId = $integerDesiredSkillValue;
        $user->desiredskills()->sync($skillId, false);

        $idTag = [];
        foreach ($stringDesiredSkillValue as $arrayValue) {
            // check if entry is duplicate before inserting
            $idTag[] = Tag::insertGetId($arrayValue);
        }

        $skillTagId = $idTag;
        $user->desiredtagskills()->sync($skillTagId, false);

        return $desiredSkills;
    }

    public function deleteUserSkill(Request $request)
    {
        $user = Auth::user();
        $skillId = $request->skillId;
        if ($request->skillType === 'cskill') {
            $user->childskills()->detach($skillId);
        }
        if ($request->skillType === 'tskill') {
            $user->tagskills()->detach($skillId);
        }
        if ($request->skillType === 'dcskill') {
            $user->desiredskills()->detach($skillId);
        }
        if ($request->skillType === 'dtskill') {
            $user->desiredtagskills()->detach($skillId);
        }
        $userId = Auth::id();
        $data = User::where('id', $userId)
            ->with('childskills')
            ->with('desiredskills')
            ->with('tagskills')
            ->with('desiredtagskills')
            ->with('stations')
            ->with('organizations')
            ->first();
        return response()->json($data);
    }
}
