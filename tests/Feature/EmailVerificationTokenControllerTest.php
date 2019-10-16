<?php

namespace Tests\Feature;

use App\Mail\VerifyEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class EmailVerificationTokenControllerTest extends TestCase
{
    use WithFaker;

    public function testVerifyEmail_withoutEmailField() {
        Mail::fake();

        $response = $this->json('POST', 'upload-lost-id/uploader-email');

        $response->assertStatus(422);
        $response->assertJsonFragment(['uploaderEmail' => ['Uploader email required']]);
        Mail::assertNothingSent();
    }

    public function testVerifyEmail_withInvalidEmailField() {
        Mail::fake();
        $response = $this->json('POST', 'upload-lost-id/uploader-email', ['uploaderEmail' => 'invalid-email']);

        $response->assertStatus(422);
        $response->assertJsonFragment(['uploaderEmail' => ['Invalid email provided']]);
        Mail::assertNothingSent();
    }

    public function testVerifyEmail_withValidEmail() {
        $email = $this->faker->email();

        Mail::fake();
        $response = $this->json('POST',
            'upload-lost-id/uploader-email',
            ['uploaderEmail' => $email]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('email_verification_tokens', ['email' => $email]);

        Mail::assertSent(VerifyEmail::class, function ($mail) use ($email) {
            return $mail->hasTo($email);
        });
    }
}
