<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Skill;
use App\User;

class SkillController extends Controller
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

    public function skillIndex()
    {
        $skills = Skill::all();
        return response()->json($skills);
    }

    public function showAllRelatedSkills(Request $request)
    {
        $skillName = $request->skillName;
        $querySkill = Skill::where('skillname', 'like', '%' . $skillName . '%')->get();

        // return response()->json($querySkill);
        return $querySkill;
    }

    public function searchUserWithSkill(Request $request)
    {
        $querySkill = $this->showAllRelatedSkills($request);
        $userName = [];

        foreach ($querySkill as $skill) {
            foreach ($skill->users as $user) {
                $userName[] = $user['id'];
            }
        }

        $userName = array_unique($userName);
        $userData = User::whereIn('id', $userName)->with('skills')->get();

        // return response()->json($userName);
        return response()->json($userData);
    }
}
