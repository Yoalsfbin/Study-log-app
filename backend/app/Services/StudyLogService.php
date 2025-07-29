<?php

namespace App\Services;

use App\Repositories\StudyLogRepository;

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

    public function create(array $data): \App\Models\StudyLog
    {
        return $this->repository->createForUser(1, $data);
    }

    public function update(int $id, array $data): bool
    {
        $log = $this->repository->findById($id);

        return $this->repository->update($data);
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
