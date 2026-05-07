<?php

namespace Database\Seeders;

use App\Models\School;
use App\Models\SchoolUser;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::query()->updateOrCreate(
            ['email' => 'test@example.com'],
            [
            'name' => 'Test User',
                'password' => Hash::make('password'),
            ]
        );

        $schools = [
            School::query()->updateOrCreate(
                ['slug' => 'academix-primary'],
                [
                    'name' => 'Academix Primary School',
                    'domain' => 'academix-primary.academixsuite.test',
                    'status' => 'active',
                ]
            ),
            School::query()->updateOrCreate(
                ['slug' => 'academix-secondary'],
                [
                    'name' => 'Academix Secondary School',
                    'domain' => 'academix-secondary.academixsuite.test',
                    'status' => 'active',
                ]
            ),
        ];

        foreach ($schools as $school) {
            SchoolUser::query()->updateOrCreate(
                [
                    'school_id' => $school->id,
                    'user_id' => $user->id,
                ],
                [
                    'role' => 'owner',
                ]
            );
        }
    }
}
