<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Surya wana bakti',
            'email' => 'surya@dev',
            'password' => Hash::make('qwerty123')
        ])->assignRole('super');

        User::create([
            'name' => 'Admin',
            'email' => 'admin@dev',
            'password' => Hash::make('qwerty123')
        ])->assignRole('admin');
    }
}
