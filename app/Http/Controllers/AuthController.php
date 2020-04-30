<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Auth\Events\Verified;

class AuthController extends Controller
{
    use VerifiesEmails;

    public $successStatus = 200;

    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */
    public function login(Request $request)
    {
        if (Auth::attempt(['email' => request('username'), 'password' => request('password')])) {
            $user = Auth::user();
            $success['name'] =  $user->name;
            // $success['token'] =  $user->createToken('MyApp')->accessToken;
            $tokenRequest = Request::create('/oauth/token', 'post');
            $response = \Route::dispatch($tokenRequest);

            $user = User::where('email', $request->username)->first();

            if ($user->email_verified_at !== NULL) {
                $success['message'] = "Login successfull";
                return $response;
            } else {
                return response()->json(['error' => 'Please Verify Email'], 401);
            }
        }
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required',
            'lastname' => 'required',
            'gender' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'confirmPassword' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $request->merge([
            'name' => $request->firstname . ' ' . $request->lastname
        ]);

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);
        $user->sendApiEmailVerificationNotification();

        // $success['token'] =  $user->createToken('ConectaApp')->accessToken;
        $success['name'] =  $user->name;
        $success['message'] = 'Please confirm yourself by clicking on verify user button sent to you on your email';

        return response()->json(['success' => $success], $this->successStatus);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}
