<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// $router->get('authors',  ['uses' => 'UserController@showAllAuthors']);

$router->get('user/{id}', ['uses' => 'UserController@showOneUser']);

// $router->post('authors', ['uses' => 'UserController@create']);

// $router->delete('authors/{id}', ['uses' => 'UserController@delete']);

// $router->put('authors/{id}', ['uses' => 'UserController@update']);

$router->get('skill/{skillName}', ['uses' => 'SkillController@searchUserWithSkill']);

$router->get('show-all-related-skills/{skillName}', ['uses' => 'SkillController@showAllRelatedSkills']);
