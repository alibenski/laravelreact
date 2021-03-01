<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ConnectNotification;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendmail($email)
    {
        Mail::to(['mmorgan@unicef.org', 'allyson.frias@un.org'])->send(new ConnectNotification());
        return response()->json(["message" => "Email sent successfully to: " . $email]);

    }
}
