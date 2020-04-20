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

Route::post('login', 'LoginController@login');
Route::post('register', 'LoginController@register');
Route::group(['middleware' => 'auth:api'], function () {
    Route::post('details', 'LoginController@details');
});

$router->get('user/{id}', ['uses' => 'UserController@showOneUser']);
$router->post('user', ['uses' => 'UserController@insertUser']);

$router->get('skill-index', ['uses' => 'SkillController@skillIndex']);
$router->get('skill-tree', ['uses' => 'SkillController@skillTree']);
$router->get('show-all-related-skills/{skillName}', ['uses' => 'SkillController@showAllRelatedSkills']);
$router->get('skill/{skillName}', ['uses' => 'SkillController@searchUserWithSkill']);
