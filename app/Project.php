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
}
