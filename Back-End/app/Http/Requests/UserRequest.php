<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ];

        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['email'] = 'required|email|unique:users,email,' . $this->route('user');
            $rules['password'] = 'sometimes|string|min:6';
        }

        return $rules;
    }
} 