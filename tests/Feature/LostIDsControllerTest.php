<?php

namespace Tests\Feature;

use App\EmailVerificationToken;
use App\LostId;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class LostIDsControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    private $token;
    private $idData;
    private $email;

    protected function setUp(): void {
        parent::setUp();

        $file = UploadedFile::fake()->image('ble.jpg');
        Log::error($file);
        $this->idData = [
            'idNumber'              => '1234',
            'idImage'               => UploadedFile::fake()->image('ble.jpg'),
            'phoneNumberToBeCalled' => '1234',
            'placeFound'            => 'asdf',
            'uploaderEmail'         => $this->faker->email,
            'token'                 => '123456'
        ];
    }

    public function testCreateLostId_WithoutData() {
        $response = $this->json('POST', '/upload-lost-id/id-data', []);

        $response->assertStatus(422);
    }

    public function testCreateLostId_WithoutFile() {
        $this->idData['idImage'] = 'ble';
        $response = $this->json('POST', '/upload-lost-id/id-data', $this->idData);

        $response->assertStatus(422)
            ->assertJsonFragment(['idImage' => ['Id image must be a file']]);
    }

    public function testCreateLostId_WithInvalidToken() {
        $response = $this->json('POST', '/upload-lost-id/id-data', $this->idData);

        $response->assertStatus(401)
            ->assertJsonFragment(['error_message' => 'Invalid token']);
    }

    public function testCreateLostId_WithValidToken() {
        Storage::fake('local');

        $emailVerificationToken = new EmailVerificationToken;
        $emailVerificationToken->token = $this->idData['token'];
        $emailVerificationToken->email = $this->idData['uploaderEmail'];
        $emailVerificationToken->expires_at = now()->addMinutes(15);
        $emailVerificationToken->save();

        $response = $this->json('POST', '/upload-lost-id/id-data', $this->idData);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Lost Id successfully uploaded']);
        $this->assertDatabaseHas('lostIds', [
            'uploader_email' => $this->idData['uploaderEmail']
        ]);
    }
}
