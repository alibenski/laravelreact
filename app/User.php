<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Notifications\VerifyApiEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable, HasApiTokens;

    public function parentskills()
    {
        return $this->belongsToMany('App\Parentskill');
    }

    public function childskills()
    {
        return $this->belongsToMany('App\Childskill');
    }

    public function desiredskills()
    {
        return $this->belongsToMany('App\Childskill', 'desiredskill_user');
    }

    public function tagskills()
    {
        return $this->belongsToMany('App\Tag');
    }

    public function stations()
    {
        return $this->hasOne('App\Station', 'id', 'station_id');
    }

    public function organizations()
    {
        return $this->hasOne('App\Organization', 'id', 'organization_id');
    }

    public function sendApiEmailVerificationNotification()
    {
        $this->notify(new VerifyApiEmail); // my notification
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'name', 'email', 'password', 'dob', 
        'gender', 'phone', 'shadow', 'mentor', 'host', 'organization_id', 'station_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
