<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudyLogRequest;
use App\Http\Requests\UpdateStudyLogRequest;
use App\Services\StudyLogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\StudyLog;

class StudyLogController extends Controller
{

    private StudyLogService $studyLogService;

    public function __construct(StudyLogService $studyLogService)
    {
        $this->studyLogService = $studyLogService;
        $this->authorizeResource(StudyLog::class, 'study_log');
    }

    public function index(): JsonResponse
    {
        $userId = Auth::id();
        $logs = $this->studyLogService->getAllForUser($userId);

        return response()->json($logs);
    }

    public function store(StoreStudyLogRequest $request): JsonResponse
    {
        $userId = Auth::id();
        $log = $this->studyLogService->create(
            $userId,
            $request->validated()
        );

        return response()->json($log, 201);
    }

    public function update(UpdateStudyLogRequest $request, StudyLog $study_log): JsonResponse
    {
        $this->authorize('update', $study_log);
        $log = $this->studyLogService->update($study_log, $request->validated());

        return response()->json($log);
    }

    public function destroy(StudyLog $study_log): JsonResponse
    {
        $this->authorize('delete', $study_log);
        $deleted = $this->studyLogService->delete($study_log);

        return response()->json(['message' => 'Deleted']);
    }
}
