<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EmailVerificationTokenControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testVerifyEmail_withoutEmailField() {
        $response = $this->json('POST', 'upload-lost-id/uploader-email');

        $response->assertStatus(422);
        $response->assertJsonFragment(['uploaderEmail' => ['Uploader email required']]);
    }

    public function testVerifyEmail_withInvalidEmailField() {
        $response = $this->json('POST', 'upload-lost-id/uploader-email', ['uploaderEmail' => 'invalid-email']);

        $response->assertStatus(422);
        $response->assertJsonFragment(['uploaderEmail' => ['Invalid email provided']]);
    }

    public function testVerifyEmail_withValidEmail() {
        $response = $this->json('POST',
            'upload-lost-id/uploader-email',
            ['uploaderEmail' => 'johngachihi3@gmail.com']);

        $response->assertStatus(200);
        $this->assertDatabaseHas('email_verification_tokens', ['email' => 'johngachihi3@gmail.com']);
    }
}
