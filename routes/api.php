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
Route::post('password/email', 'ForgotPasswordController@sendResetLinkEmail');
Route::post('password/reset', 'ResetPasswordController@reset');

Route::group(['middleware' => 'auth:api'], function () use ($router) {
    $router->get('logout', 'AuthController@logout');
    $router->get('details', 'UserController@details');
    $router->get('/user', function (Request $request) {
        return $request->user();
    });

    $router->get('show-user-skills', ['uses' => 'UserController@showUserSkills']);
    $router->post('insert-user', ['uses' => 'UserController@insertUser']);
    $router->post('update-user-skills', ['uses' => 'UserController@updateUserSkills']);
    $router->post('update-user-profile', ['uses' => 'UserController@updateUserProfile']);
    $router->post('delete-user-skill', ['uses' => 'UserController@deleteUserSkill']);

    $router->get('skill-tree', ['uses' => 'SkillController@skillTree']);
    $router->get('show-all-related-skills/{skillName}', ['uses' => 'SkillController@showAllRelatedSkills']);
    $router->get('skill/{skillName}', ['uses' => 'SkillController@searchUserWithSkill']);

    $router->get('view-all-projects', ['uses' => 'ProjectController@viewAllProjects']);
    $router->get('view-projects', ['uses' => 'ProjectController@viewProjects']);
    $router->get('edit-project/{id}', ['uses' => 'ProjectController@editProject']);
    $router->post('project', ['uses' => 'ProjectController@insertProject']);
    $router->post('update-project', ['uses' => 'ProjectController@updateProject']);
    $router->post('delete-project-skill', ['uses' => 'ProjectController@deleteProjectSkill']);
    $router->post('search-project-skill', ['uses' => 'ProjectController@searchProjectSkill']);
});
$router->get('skill-index', ['uses' => 'SkillController@skillIndex']);
$router->get('get-all-child-skills', ['uses' => 'SkillController@getAllChildSkills']);
$router->get('get-all-organizations', ['uses' => 'OrganizationController@getAllOrganizations']);
$router->get('get-all-countries', ['uses' => 'OrganizationController@getAllCountries']);
