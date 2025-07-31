<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudyLogController;
use App\Http\Controllers\Auth\AuthController;

Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'me']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::prefix('study-logs')->group(function () {
    Route::get('/', [StudyLogController::class, 'index']);
    Route::post('/', [StudyLogController::class, 'store']);
    Route::put('/{id}', [StudyLogController::class, 'update']);
    Route::delete('/{id}', [StudyLogController::class, 'destroy']);
});


