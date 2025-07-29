<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudyLogRequest;
use App\Services\StudyLogService;
use Illuminate\Http\JsonResponse;

class StudyLogController extends Controller
{

    private StudyLogService $studyLogService;

    public function __construct(StudyLogService $studyLogService)
    {
        $this->studyLogService = $studyLogService;
    }

    public function index(): JsonResponse
    {
        $logs = $this->studyLogService->getAllForUser();
        return response()->json($logs);
    }

    public function store(StoreStudyLogRequest $request): JsonResponse
    {
        $log = $this->studyLogService->create($request->validated());
        return response()->json($log, 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->studyLogService->delete($id);

        if (!$deleted) {
            return response()->json(['message' => 'Forbidden or not found'], 403);
        }

        return response()->json(['message' => 'Deleted']);
    }
}
