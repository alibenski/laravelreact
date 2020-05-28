<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use FullTextSearch;
    /**
     * The columns of the full text index
     */
    protected $searchable = [
        'skillname'
    ];

    public function users()
    {
        return $this->belongsToMany('App\User');
    }
}
