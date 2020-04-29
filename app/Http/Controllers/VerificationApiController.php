<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;

class VerificationApiController extends Controller
{
    use VerifiesEmails;

    /**
     * Show the email verification notice.
     *
     */
    public function show()
    {
        //
    }

    /**
     * Mark the authenticated user’s email address as verified.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function verify(Request $request)
    {
        $userID = $request["id"];
        $user = User::findOrFail($userID);
        date_default_timezone_set('Europe/Zurich');
        $date = date("Y-m-d H:i:s");
        // $timeZone = date_default_timezone_get();
        $user->email_verified_at = $date; // to enable the “email_verified_at field of that user be a current time stamp by mimicing the must verify email feature
        $user->save();
        // return response()->json("Email verified!" . $date . $timeZone);
        return redirect('/login');
    }

    /**
     * Resend the email verification notification.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json("User already have verified email!", 422);
            // return redirect($this->redirectPath());
        }
        $request->user()->sendApiEmailVerificationNotification();
        return response()->json("The notification has been resubmitted");
        // return back()->with("resent", true);
    }
}
