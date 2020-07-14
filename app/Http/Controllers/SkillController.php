<?php

namespace App\Http\Controllers;

use App\Childskill;
use App\Parentskill;
use App\Station;
use App\Tag;
use App\User;
use Auth;
use Illuminate\Http\Request;
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

    public function getAllChildSkills()
    {
        $skills = Childskill::orderBy('skillname', 'asc')->get();
        $data = [];
        foreach ($skills as $skill) {
            $data[] = [
                'label' => $skill->skillname,
                'value' => $skill->id,
                'type' => 'child'
            ];
        }

        $tagSkills = $this->getAllTagSkills();

        $merge = array_merge($data, $tagSkills);
        return response()->json($merge);
    }

    public function getAllTagSkills()
    {
        $skills = Tag::all();
        $data = [];
        foreach ($skills as $skill) {
            $data[] = [
                'label' => $skill->skillname,
                'value' => $skill->id,
                'type' => 'tag'
            ];
        }

        return $data;
    }


    public function skillTree()
    {
        $skills = DB::select('SELECT p.skillname as parentskill, c.id, c.skillname FROM childskills as c, parentskills as p, childskill_parentskill as l WHERE l.parentskill_id = p.id AND l.childskill_id = c.id');

        return response()->json($skills);
    }

    public function showAllRelatedSkills(Request $request)
    {
        $skillName = $request->skillName;
        // DB::statement('ALTER TABLE childskills ADD FULLTEXT skillname (skillname)');
        $querySkill = Childskill::search($skillName)->with('parentskills')->get();

        // return response()->json($querySkill);
        return $querySkill;
    }

    public function queryTagSkill(Request $request)
    {
        $skillName = $request->skillName;
        $queryTagSkill = Tag::search($skillName)->get();
        return $queryTagSkill;
    }

    public function searchUserWithSkill(Request $request)
    {
        $querySkill = $this->showAllRelatedSkills($request);
        $queryTagSkill = $this->queryTagSkill($request);
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

        $userName3 = [];
        foreach ($queryTagSkill as $tskill) {
            foreach ($tskill->users as $tuser) {
                $userName3[] = $tuser['id'];
            }
        }

        $userData = [];
        $userNameMerge = array_merge($userName, $userName2, $userName3);
        if (!empty($userNameMerge)) {
            $userNameUnique = array_unique($userNameMerge);
            $implodeArray = implode(',', $userNameUnique);
            $userData = User::whereIn('id', $userNameUnique)
                ->orderByRaw(DB::raw("FIELD(id, $implodeArray)"))
                ->with('childskills')
                ->with('desiredskills')
                ->with('tagskills')
                ->with('desiredtagskills')
                ->with('stations')
                ->with('organizations')
                ->with('languages')
                ->get();
        }

        return response()->json($userData);
    }

    public function filterUserSkill(Request $request)
    {
        $querySkill = $this->showAllRelatedSkills($request);
        $queryTagSkill = $this->queryTagSkill($request);
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

        $userName3 = [];
        foreach ($queryTagSkill as $tskill) {
            foreach ($tskill->users as $tuser) {
                $userName3[] = $tuser['id'];
            }
        }

        $userData = [];
        $userNameMerge = array_merge($userName, $userName2, $userName3);
        if (!empty($userNameMerge)) {
            $userNameUnique = array_unique($userNameMerge);
            $implodeArray = implode(',', $userNameUnique);
            $userData = User::whereIn('id', $userNameUnique)
                ->orderByRaw(DB::raw("FIELD(id, $implodeArray)"))
                ->whereHas('stations', function ($q) use ($request) {
                    $q->where('name', $request->location);
                })
                ->with('childskills')
                ->with('desiredskills')
                ->with('tagskills')
                ->with('desiredtagskills')
                ->with('stations')
                ->with('organizations')
                ->with('languages')
                ->get();
        }

        return response()->json($userData);
    }
}
