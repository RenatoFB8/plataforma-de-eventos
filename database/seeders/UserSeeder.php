<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name' => 'Renato Barbosa',
                'email' => 'renato@gmail.com',
                'password' => Hash::make('12345678'),
            ],
            [
                'name' => 'Neuton Nakazono',
                'email' => 'neuton@gmail.com',
                'password' => Hash::make('12345678'),
            ],
            [
                'name' => 'Pedro Ivo',
                'email' => 'pedro@gmail.com',
                'password' => Hash::make('12345678'),
            ],
            [
                'name' => 'Cesar Faustino',
                'email' => 'cesar@gmail.com',
                'password' => Hash::make('12345678'),
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
