<?php

namespace App\Repositories;

use App\Models\StudyLog;

class StudyLogRepository
{
    public function getByUser(int $userId)
    {
        return StudyLog::where('user_id', $userId)->latest()->get();
    }

    public function createForUser(int $userId, array $data): StudyLog
    {
        return StudyLog::create(array_merge($data, ['user_id' => $userId]));
    }

    public function findById(int $id): ?StudyLog
    {
        return StudyLog::find($id);
    }

    public function delete(StudyLog $log): bool
    {
        return $log->delete();
    }
}
