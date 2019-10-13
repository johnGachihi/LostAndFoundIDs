<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\LostId;
use Faker\Generator as Faker;

$factory->define(LostId::class, function (Faker $faker) {
    return [
        'id_number' =>  $faker->randomNumber(6),
        'finder_phone_number' => $faker->e164PhoneNumber,
        'image' => '/storage/dummy.png',
        'place_found' => $faker->streetName,
        'uploader_email' => $faker->email
    ];
});
