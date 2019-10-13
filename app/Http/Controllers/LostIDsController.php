<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\LostId;

class LostIDsController extends Controller
{
    function getLostId($id_number) {
        return LostId::where("id_number", $id_number)->get();
    }

    function getAll() {
        return LostId::all();
    }
}
