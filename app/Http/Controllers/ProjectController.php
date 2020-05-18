<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
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

    public function insertProject(Request $request)
    {
        DB::transaction(function () use ($request) {

            $projectId = 1;
            if (Project::count() > 0) {
                $projectId = Project::max('id') + 1;
            }


            DB::insert('INSERT INTO projects (id, project_owner, project_description, current_team,
                remaining_tasks, stage, people_needed, is_on_premise, location, contact, created_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,now())', [$projectId, $request->projectOwner, $request->projectDescription,
                $request->currentTeam, $request->tasksNeeded, $request->stage, $request->peopleNeeded,
                $request->isOnPremiseValue, $request->location, $request->contact]);

            foreach ($request->state["checked"] as $skillId) {

                DB::insert('INSERT INTO childskill_project (project_id, childskill_id)
                    VALUES (?,?)', [$projectId, $skillId]);
            }
        });

    }
}
