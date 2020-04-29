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

Route::post('login', 'AuthController@login')
    ->middleware(['api-login', 'throttle']);

Route::post('register', 'AuthController@register');
Route::get('email/verify/{id}', 'VerificationApiController@verify')->name('verificationapi.verify');
Route::get('email/resend', 'VerificationApiController@resend')->name('verificationapi.resend');

Route::group(['middleware' => 'auth:api'], function () use ($router) {
    $router->get('logout', 'AuthController@logout');
    $router->post('details', 'AuthController@details');
    $router->get('/user', function (Request $request) {
        return $request->user();
    });

    $router->get('user/{id}', ['uses' => 'UserController@showOneUser']);
    $router->post('user', ['uses' => 'UserController@insertUser']);

    $router->get('skill-tree', ['uses' => 'SkillController@skillTree']);
    $router->get('show-all-related-skills/{skillName}', ['uses' => 'SkillController@showAllRelatedSkills']);
    $router->get('skill/{skillName}', ['uses' => 'SkillController@searchUserWithSkill']);
});
$router->get('skill-index', ['uses' => 'SkillController@skillIndex']);
