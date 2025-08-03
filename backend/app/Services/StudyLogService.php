<?php

namespace App\Services;

use App\Repositories\StudyLogRepository;
use \App\Models\StudyLog;

class StudyLogService
{
    private StudyLogRepository $repository;

    public function __construct(StudyLogRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAllForUser(int $userId): \Illuminate\Support\Collection
    {
        return $this->repository->getByUser($userId);
    }

    public function create(int $userId, array $data): StudyLog
    {
        return $this->repository->createForUser($userId, $data);
    }

    public function update(StudyLog $log, array $data): StudyLog
    {
        $this->repository->update($log, $data);
        return $log;
    }

    public function delete(StudyLog $log): bool
    {
        return $this->repository->delete($log);
    }
}
