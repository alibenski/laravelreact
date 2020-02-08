<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Parentskill;
use App\Childskill;
use App\User;
use Illuminate\Support\Facades\DB;

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
        // $querySkill = Childskill::where('skillname', 'like', '%' . $skillName . '%')->with('parentskills')->get();
        DB::statement('ALTER TABLE childskills ADD FULLTEXT  (skillname)');
        $querySkill = Childskill::search($skillName)
            ->with('parentskills')
            ->get();
        // return response()->json($querySkill);
        return $querySkill;
    }

    public function searchUserWithSkill(Request $request)
    {
        $querySkill = $this->showAllRelatedSkills($request);
        $userName = [];
        $userName2 = [];

        foreach ($querySkill as $skill) {
            foreach ($skill->users as $user) {
                $userName[] = $user['id'];
            }
            foreach ($skill->parentskills as $parentskill) {
                foreach ($parentskill->users as $user) {
                    $userName2[] = $user['id'];
                }
            }
        }

        $userNameMerge = array_merge($userName, $userName2);
        $userNameUnique = array_unique($userNameMerge);
        $implodeArray = implode(',', $userNameUnique);
        $userData = User::whereIn('id', $userNameUnique)
            ->orderByRaw(DB::raw("FIELD(id, $implodeArray)"))
            ->with('childskills')
            ->get();

        // return response()->json($userName);
        return response()->json($userData);
    }
}
