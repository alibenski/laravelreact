<?php

namespace App\Http\Controllers;

use App\Project;
use App\Childskill;
use App\Tag;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
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

    public function viewAllProjects()
    {
        $projects = Project::all();

        return response()->json($projects);
    }

    public function viewProjects()
    {
        $userId = Auth::id();
        $projects = User::where('id', $userId)->with('projects')->first();

        return response()->json($projects);
    }

    public function insertProject(Request $request)
    {
        $this->validate($request, array(
            'projectTitle' => 'required|',
            'projectOwner' => 'required|',
            'projectDescription' => 'required|',
            'currentTeam' => 'required|',
            'tasksNeeded' => 'required|',
            'tasksDone' => 'required|',
            'peopleNeeded' => 'required|',
            'contact' => 'required|',
            'selected' => 'required|',
        ));

        $userId = Auth::id();
        $projectId = 1;
        if (Project::count() > 0) {
            $projectId = Project::max('id') + 1;
        }

        DB::transaction(function () use ($request, $projectId, $userId) {

            DB::insert('INSERT INTO projects (id, user_id, title, project_owner, project_description, current_team,
                remaining_tasks, tasks_done, stage, people_needed, is_on_premise, location, contact, created_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,now())', [
                $projectId, $userId, $request->projectTitle, $request->projectOwner, $request->projectDescription,
                $request->currentTeam, $request->tasksNeeded,
                $request->tasksDone, $request->stage, $request->peopleNeeded,
                $request->isOnPremiseValue, $request->location, $request->contact
            ]);

            // foreach ($request->state["checked"] as $skillId) {

            //     DB::insert('INSERT INTO childskill_project (project_id, childskill_id)
            //         VALUES (?,?)', [$projectId, $skillId]);
            // }
        });

        foreach ($request->selected as $select) {
            if ($select["type"] === 'child') {
                $cSkillId = $select["value"];
                DB::insert('INSERT INTO childskill_project (project_id, childskill_id)
                    VALUES (?,?)', [$projectId, $cSkillId]);
            }
            if ($select["type"] === 'tag') {
                $tSkillId = $select["value"];
                DB::insert('INSERT INTO project_tag (project_id, tag_id)
                    VALUES (?,?)', [$projectId, $tSkillId]);
            }
        }

        return response()->json($userId);
    }

    public function showProject($id)
    {
        $project = Project::where('id', $id)->with('childskills')->with('tagskills')->first();
        return response()->json($project);
    }

    public function editProject($id)
    {
        $project = Project::where('id', $id)->with('childskills')->with('tagskills')->first();
        return response()->json($project);
    }

    public function updateProject(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|',
            'project_owner' => 'required|',
            'project_description' => 'required|',
            'current_team' => 'required|',
            'remaining_tasks' => 'required|',
            'tasks_done' => 'required|',
            'contact' => 'required|',
        ]);

        $project = Project::find($request->id);
        $input = array_filter($request->all());

        if ($request->is_on_premise === false) {
            $project->is_on_premise = 0;
            $project->location = '0';
        }

        $project->update($input);

        $selected = $request->selected;
        $selectedSkills = [];
        if ($selected) {
            foreach ($selected as $skill) {
                if (array_key_exists("type", $skill)) {
                    $selectedSkills[] = [
                        'value' => $skill["value"],
                        'type' => $skill["type"],
                    ];
                } else {
                    $selectedSkills[] = [
                        'value' => $skill["value"],
                        'type' => 'tag',
                    ];
                }
            }
        }
        $this->updateProjectSkills($project, $selectedSkills);

        $data = Project::where('id', $request->id)->with('childskills')->with('tagskills')->first();
        return response()->json($data);
    }

    public function updateProjectSkills($project, $selectedSkills)
    {
        $integerSkillValue = [];
        $stringSkillValue = [];
        foreach ($selectedSkills as $skillValue) {
            if (is_int($skillValue["value"])) {
                $integerSkillValue[] = [
                    "id" => $skillValue["value"],
                    "type" => $skillValue["type"],
                ];
            } else {
                $stringSkillValue[] = ["skillname" => $skillValue["value"]];
            }
        }

        foreach ($integerSkillValue as $v) {
            if ($v["type"] === "child") {
                $skillId = $v["id"];
                $project->childskills()->sync($skillId, false);
            }
            if ($v["type"] === "tag") {
                $tagSkillId = $v["id"];
                $project->tagskills()->sync($tagSkillId, false);
            }
        }
    }

    public function deleteProjectSkill(Request $request)
    {
        $project = Project::where('id', $request->id)->first();
        $skillId = $request->skillId;
        if ($request->skillType === 'cskill') {
            $project->childskills()->detach($skillId);
        }
        if ($request->skillType === 'tskill') {
            $project->tagskills()->detach($skillId);
        }

        $data = Project::where('id', $request->id)->with('childskills')->with('tagskills')->first();
        return response()->json($data);
    }

    public function searchProjectSkill(Request $request)
    {
        $queryProjectChildSkill = $this->queryProjectChildSkill($request);
        $queryProjectTagSkill = $this->queryProjectTagSkill($request);

        $userName = [];
        foreach ($queryProjectChildSkill as $skill) {
            foreach ($skill->projects as $user) {
                $userName[] = $user['id'];
            }
        }

        $userName3 = [];
        foreach ($queryProjectTagSkill as $tskill) {
            foreach ($tskill->projects as $tuser) {
                $userName3[] = $tuser['id'];
            }
        }

        $userData = [];
        $userNameMerge = array_merge($userName, $userName3);
        if (!empty($userNameMerge)) {
            $userNameUnique = array_unique($userNameMerge);
            $implodeArray = implode(',', $userNameUnique);
            $userData = Project::whereIn('id', $userNameUnique)
                ->orderByRaw(DB::raw("FIELD(id, $implodeArray)"))
                ->get();
        }

        return response()->json($userData);
    }

    public function queryProjectChildSkill(Request $request)
    {
        $skillName = $request->skillName;
        $querySkill = Childskill::search($skillName)->has('projects')->with('projects')->get();
        return $querySkill;
    }

    public function queryProjectTagSkill(Request $request)
    {
        $skillName = $request->skillName;
        $queryTagSkill = Tag::search($skillName)->has('projects')->with('projects')->get();
        return $queryTagSkill;
    }

    public function filterProjectSkill(Request $request)
    {
        $queryProjectChildSkill = $this->queryProjectChildSkill($request);
        $queryProjectTagSkill = $this->queryProjectTagSkill($request);

        $userName = [];
        foreach ($queryProjectChildSkill as $skill) {
            foreach ($skill->projects as $user) {
                $userName[] = $user['id'];
            }
        }

        $userName3 = [];
        foreach ($queryProjectTagSkill as $tskill) {
            foreach ($tskill->projects as $tuser) {
                $userName3[] = $tuser['id'];
            }
        }

        $projects = [];
        $userNameMerge = array_merge($userName, $userName3);
        if (!empty($userNameMerge)) {
            $userNameUnique = array_unique($userNameMerge);
            $implodeArray = implode(',', $userNameUnique);
            $projects = Project::whereIn('id', $userNameUnique)->where('location', $request->location)
                ->orderByRaw(DB::raw("FIELD(id, $implodeArray)"))
                ->get();
        }

        return response()->json($projects);
    }
}
