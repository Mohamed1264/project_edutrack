<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'school_key' => 'ISTA',
            'user_key' => User::inRandomOrder()->first()->user_key,
            'teacher_type_id'=>null,
            'password'=>Hash::make('password'),
            'original_password'=>'password',
            'is_active'=>false,
            'last_reset_password_at'=>null,
            'last_login_at'=>null,
        ];
    }
}
