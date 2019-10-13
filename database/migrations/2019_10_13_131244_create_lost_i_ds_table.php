<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLostIDsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lostIds', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('id_number');
            $table->integer('finder_phone_number');
            $table->string('image');
            $table->string('place_found');
            $table->string('uploader_email');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lostIds');
    }
}
