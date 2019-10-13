<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('lost-and-found-ids/{id_number}', 'LostIDsController@getLostId')
    ->where('id_number', '[0-9]+');
Route::get('lost-and-found-ids', 'LostIDsController@getAll');

Route::view('/{path?}', 'welcome')
    ->where('path', '.*');

//Route::view('/upload', 'welcome');
