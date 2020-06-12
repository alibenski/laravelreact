<?php

namespace App\Http\Controllers;

use App\Project;
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

        return response()->json($project);
    }
}
