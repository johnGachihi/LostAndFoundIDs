<?php

namespace App\Http\Controllers;

use App\EmailVerificationToken;
use Illuminate\Http\Request;
use App\LostId;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class LostIDsController extends Controller
{
    const IMAGES_FOLDER = 'id-images';

    function getLostId($id_number) {
        return LostId::where("id_number", $id_number)->get();
    }

    function getAll() {
        return LostId::all();
    }

    function createLostId(Request $request) {
        $this->validateIdData($request->input());
        Log::error("Request made");

        $emailTokenValid = $this->isEmailTokenValid(
            $request->input('token'),
            $request->input('uploaderEmail')
        );
        if(! $emailTokenValid) {
            return response()->json(['error_message' => 'Invalid token'], 401);
        }

        $this->persistLostId($request->all(), $request->idImage);

        return response()->json(['message' => 'Lost Id successfully uploaded'], 200);
    }

    private function validateIdData($input) {
        Validator::make($input,
            [
                'idNumber'              => 'required',
                'idImage'               => 'file',
                'phoneNumberToBeCalled' => 'required',
                'placeFound'            => 'required',
                'uploaderEmail'         => 'required|email',
                'token'                 => 'required'
            ],
            [
                'uploaderEmail.required' => 'Uploader email required',
                'uploaderEmail.email'    => 'Invalid email provided',
                'idImage.file' => 'Id image must be a file'
            ]
        )->validate();
    }

    private function isEmailTokenValid($token, $email) {
        $token = EmailVerificationToken::where('token', $token)
            ->where('email', $email)
            ->whereRaw('expires_at > ?', [now()])
            ->get();

        return $token->isNotEmpty();
    }

    private function persistLostId($data, UploadedFile $idImageFile) {
        $newLostId = new LostId;
        $newLostId->id_number = $data['idNumber'];
        $newLostId->finder_phone_number = $data['phoneNumberToBeCalled'];
        $newLostId->place_found = $data['placeFound'];
        $newLostId->uploader_email = $data['uploaderEmail'];

        $imageName = $idImageFile->hashName();
        $idImageFile->store(self::IMAGES_FOLDER);

        $newLostId->image = $imageName;

        $newLostId->save();
    }
}
