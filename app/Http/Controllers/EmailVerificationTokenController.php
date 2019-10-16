<?php

namespace App\Http\Controllers;

use App\Mail\VerifyEmail;
use Hamcrest\Core\Every;
use Illuminate\Http\Request;
use App\EmailVerificationToken;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class EmailVerificationTokenController extends Controller
{
    function verifyEmail(Request $request) {
        $this->validateEmailInput($request->all());

        $emailVerificationToken = $this->persistToken(
            $this->generateToken(),
            $request->input('uploaderEmail')
        );

        Mail::to($request->input("uploaderEmail"))
            ->send(new VerifyEmail($emailVerificationToken));
    }

    private function validateEmailInput($input) {
        Validator::make($input,
            ['uploaderEmail' => 'required|email'],
            [
                'uploaderEmail.required' => 'Uploader email required',
                'uploaderEmail.email' => 'Invalid email provided'
            ]
        )->validate();
    }

    function persistToken($token, $email) {
        $emailVerificationToken = new EmailVerificationToken();
        $emailVerificationToken->token = $token;
        $emailVerificationToken->email = $email;
        $emailVerificationToken->expires_at = now()->addMinutes(15);
        $emailVerificationToken->save();

        return $emailVerificationToken;
    }

    private function generateToken() {
        return uniqid();
    }
}
