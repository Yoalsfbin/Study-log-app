<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use App\Http\Controllers\Api\StudyLogController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\TagController;
use Illuminate\Http\Request;

// RateLimiter の定義
RateLimiter::for('api', function ($request) {
    return Limit::perMinute(60)->by(optional($request->user())->id ?: $request->ip());
});

// CSRFトークン取得用ルート
Route::get('/sanctum/csrf-cookie', fn () => response()->noContent());

// 認証API
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// 認証後にしかアクセスできないAPI
Route::middleware('auth:sanctum')->group(function () {
    // ログインユーザー情報
    Route::get('/me', [AuthController::class, 'me']);

    // 学習ログAPI
    Route::prefix('study-logs')->group(function () {
        Route::get('/', [StudyLogController::class, 'index']);
        Route::post('/', [StudyLogController::class, 'store']);
        Route::put('/{study_log}', [StudyLogController::class, 'update']);
        Route::delete('/{study_log}', [StudyLogController::class, 'destroy']);
    });

    // タグ管理API
    Route::prefix('tags')->group(function () {
        Route::get('/', [TagController::class, 'index']);
        Route::post('/', [TagController::class, 'store']);
        Route::put('/{tag}', [TagController::class, 'update']);
        Route::delete('/{tag}', [TagController::class, 'destroy']);
    });
});


