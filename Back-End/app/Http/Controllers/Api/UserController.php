<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(): AnonymousResourceCollection
    {
        $users = $this->userService->getAllUsers();
        return UserResource::collection($users);
    }

    public function store(UserRequest $request): JsonResponse
    {
        $user = $this->userService->createUser($request->validated());
        return response()->json([
            'message' => 'User created successfully',
            'data' => new UserResource($user)
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $user = $this->userService->getUserById($id);
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json([
            'data' => new UserResource($user)
        ]);
    }

    public function update(UserRequest $request, int $id): JsonResponse
    {
        $user = $this->userService->getUserById($id);
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $this->userService->updateUser($id, $request->validated());
        
        return response()->json([
            'message' => 'User updated successfully',
            'data' => new UserResource($user)
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $user = $this->userService->getUserById($id);
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $this->userService->deleteUser($id);
        
        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }
} 