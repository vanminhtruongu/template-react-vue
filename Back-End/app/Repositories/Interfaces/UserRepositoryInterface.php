<?php

namespace App\Repositories\Interfaces;

interface UserRepositoryInterface extends BaseRepositoryInterface
{
    public function findByEmail(string $email);
    public function getUsersWithPagination(int $perPage = 10);
} 