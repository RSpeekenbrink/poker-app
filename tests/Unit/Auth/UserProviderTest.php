<?php

namespace Tests\Unit\Auth;

use App\Auth\StubUser;
use App\Auth\UserProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserProviderTest extends TestCase
{
    private UserProvider $provider;

    protected function setUp(): void
    {
        parent::setUp();
        $this->provider = new UserProvider();
    }

    #[Test]
    public function retrieveById_returns_stub_user(): void
    {
        $user = $this->provider->retrieveById('test-id');

        $this->assertInstanceOf(StubUser::class, $user);
        $this->assertSame('test-id', $user->id);
    }

    #[Test]
    public function retrieveByCredentials_returns_stub_user(): void
    {
        $user = $this->provider->retrieveByCredentials(['id' => 'cred-id']);

        $this->assertInstanceOf(StubUser::class, $user);
        $this->assertSame('cred-id', $user->id);
    }

    #[Test]
    public function retrieveByCredentials_returns_null_without_id(): void
    {
        $user = $this->provider->retrieveByCredentials(['name' => 'test']);

        $this->assertNull($user);
    }

    #[Test]
    public function validateCredentials_matches_session_user_id(): void
    {
        session(['user-id' => 'abc-123']);
        $user = new StubUser(['id' => 'abc-123']);

        $this->assertTrue($this->provider->validateCredentials($user, ['id' => 'abc-123']));
    }

    #[Test]
    public function validateCredentials_fails_when_session_id_mismatch(): void
    {
        session(['user-id' => 'abc-123']);
        $user = new StubUser(['id' => 'wrong-id']);

        $this->assertFalse($this->provider->validateCredentials($user, ['id' => 'wrong-id']));
    }

    #[Test]
    public function validateCredentials_returns_true_without_session(): void
    {
        $user = new StubUser(['id' => 'any-id']);

        $this->assertTrue($this->provider->validateCredentials($user, ['id' => 'any-id']));
    }
}
