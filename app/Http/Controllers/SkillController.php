<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Parentskill;
use App\Childskill;
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
        $skills = Parentskill::all();
        return response()->json($skills);
    }

    public function showAllRelatedSkills(Request $request)
    {
        $skillName = $request->skillName;
        $queryParentSkill = Parentskill::where('skillname', 'like', '%' . $skillName . '%')->with('childskills')->get();
        $queryChildSkill = Childskill::where('skillname', 'like', '%' . $skillName . '%')->with('parentskills')->get();

        $querySkill = $queryChildSkill->merge($queryParentSkill);

        // return response()->json($querySkill);
        return $querySkill;
    }

    public function searchUserWithSkill(Request $request)
    {
        $skillName = $request->skillName;
        $querySkill = $this->showAllRelatedSkills($request);
        $userName = [];

        foreach ($querySkill as $skill) {
            foreach ($skill->users as $user) {
                $userName[] = $user['id'];
            }
        }

        $userName = array_unique($userName);
        $userData = User::whereIn('id', $userName)
            ->with(['parentskills' => function ($q1) use ($skillName) {
                $q1->where('skillname', 'like', '%' . $skillName . '%')
                    // ->with('childskills')
                    ->get();
            }])
            ->with(['childskills' => function ($q2) use ($skillName) {
                $q2->where('skillname', 'like', '%' . $skillName . '%')
                    ->with('parentskills')
                    ->get();
            }])
            ->get();

        // return response()->json($userName);
        return response()->json($userData);
    }
}
