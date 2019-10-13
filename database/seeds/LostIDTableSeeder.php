<?php

use Illuminate\Database\Seeder;

class LostIDTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\LostId::class, 50)->create();
    }
}
