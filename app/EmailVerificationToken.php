<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmailVerificationToken extends Model
{
    protected $table = "email_verification_tokens";

    protected $dates = [
        'expires_at'
    ];
}
