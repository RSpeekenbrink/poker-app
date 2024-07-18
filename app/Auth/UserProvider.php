<?php

namespace App\Auth;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider as UserProviderContract;

use function session;

class UserProvider implements UserProviderContract
{
    public function retrieveById($identifier): StubUser
    {
        return new StubUser([
            'id' => $identifier,
        ]);
    }

    public function retrieveByToken($identifier, #[\SensitiveParameter] $token): null
    {
        return null;
    }

    public function updateRememberToken(Authenticatable $user, #[\SensitiveParameter] $token): null
    {
        return null;
    }

    public function retrieveByCredentials(#[\SensitiveParameter] array $credentials): ?StubUser
    {
        if (! array_key_exists('id', $credentials)) {
            return null;
        }

        return new StubUser([
            'id' => $credentials['id'],
        ]);
    }

    public function validateCredentials(Authenticatable $user, #[\SensitiveParameter] array $credentials): bool
    {
        if (session()->has('user-id')) {
            return $credentials['id'] === session('user-id');
        }

        return true;
    }

    public function rehashPasswordIfRequired(Authenticatable $user, #[\SensitiveParameter] array $credentials, bool $force = false): null
    {
        return null;
    }
}
