<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\EmailVerificationToken;
use Illuminate\Support\Facades\Validator;

class EmailVerificationTokenController extends Controller
{
    function verifyEmail(Request $request) {
        Validator::make($request->all(),
            ['uploaderEmail' => 'required|email'],
            [
                'uploaderEmail.required' => 'Uploader email required',
                'uploaderEmail.email' => 'Invalid email provided'
            ]
        )->validate();

        $this->persistToken(
            $this->generateToken(),
            $request->input('uploaderEmail')
        );
    }

    function persistToken($token, $email) {
        $emailVerificationToken = new EmailVerificationToken();
        $emailVerificationToken->token = $token;
        $emailVerificationToken->email = $email;
        $emailVerificationToken->expires_at = now()->addMinutes(15);
        $emailVerificationToken->save();
    }

    private function generateToken() {
        return uniqid();
    }
}
