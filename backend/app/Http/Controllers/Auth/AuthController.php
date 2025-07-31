<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        Log::info('■□');
        Log::info('■□');
        Log::info('■□');
        Log::info('■□');
        Log::info('■□');
        Log::info('■□');
        Log::info('■□');
        Log::info('■□');
        Log::info('■□');
        Log::info('■□');
        $credentials = $request->validated();
        Log::info( $credentials);
        Log::info('■□');
        Log::info('■□');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => '認証に失敗しました'], 401);
        }

        $request->session()->regenerate();
        return response()->json(['message' => 'ログイン成功']);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'ログアウトしました']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
