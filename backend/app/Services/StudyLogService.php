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

    public function getAllForUser(): \Illuminate\Support\Collection
    {
        return $this->repository->getByUser(1); // 認証前なので仮ユーザーID
    }

    public function create(array $data): StudyLog
    {
        return $this->repository->createForUser(1, $data);
    }

    public function update(int $id, array $data): ?StudyLog
    {
        $log = $this->repository->findById($id);

        if (!$log) {
            return null;
        }

        $this->repository->update($log, $data);
        return $log;
    }

    public function delete(int $id): bool
    {
        $log = $this->repository->findById($id);

        if (!$log || $log->user_id !== 1) {
            return false;
        }

        return $this->repository->delete($log);
    }
}
