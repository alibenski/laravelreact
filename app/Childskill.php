<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Childskill extends Model
{
    use FullTextSearch;
    /**
     * The parentskills that belong to the childskills.
     */
    public function parentskills()
    {
        return $this->belongsToMany('App\Parentskill');
    }

    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    public function projects()
    {
        return $this->belongsToMany('App\Project');
    }

    /**
     * The columns of the full text index
     */
    protected $searchable = [
        'skillname'
    ];
}
