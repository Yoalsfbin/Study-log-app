<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudyLogController;


Route::prefix('study-logs')->group(function () {
    Route::get('/', [StudyLogController::class, 'index']);
    Route::post('/', [StudyLogController::class, 'store']);
    Route::delete('/{id}', [StudyLogController::class, 'destroy']);
});