<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Parentskill extends Model
{
    /**
     * The users that belong to the parentskills.
     */
    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    /**
     * The childskills that belong to the parentskills.
     */
    public function childskills()
    {
        return $this->belongsToMany('App\Childskill');
    }
}
