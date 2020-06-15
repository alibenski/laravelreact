<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public function users()
    {
        return $this->belongsTo('App\User');
    }

    public function childskills()
    {
        return $this->belongsToMany('App\Childskill');
    }

    public function tagskills()
    {
        return $this->belongsToMany('App\Tag');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'project_owner', 'project_description', 'current_team', 'remaining_tasks', 'tasks_done',
        'stage', 'people_needed', 'is_on_premise', 'location', 'contact',
    ];
}
