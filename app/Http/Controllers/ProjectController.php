<?php

namespace App\Http\Controllers;

use App\Project;
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

    public function insertProject(Request $request)
    {
        $user = Auth::id();
        DB::transaction(function () use ($request, $user) {

            $projectId = 1;
            if (Project::count() > 0) {
                $projectId = Project::max('id') + 1;
            }


            DB::insert('INSERT INTO projects (id, user_id, title, project_owner, project_description, current_team,
                remaining_tasks, tasks_done, stage, people_needed, is_on_premise, location, contact, created_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,now())', [
                $projectId, $user, $request->projectTitle, $request->projectOwner, $request->projectDescription,
                $request->currentTeam, $request->tasksNeeded,
                $request->tasksDone, $request->stage, $request->peopleNeeded,
                $request->isOnPremiseValue, $request->location, $request->contact
            ]);

            foreach ($request->state["checked"] as $skillId) {

                DB::insert('INSERT INTO childskill_project (project_id, childskill_id)
                    VALUES (?,?)', [$projectId, $skillId]);
            }
        });

        return response()->json($user);
    }
}
