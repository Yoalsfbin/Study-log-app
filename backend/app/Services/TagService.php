<?php


namespace App\Services;

use App\Models\Tag;
use App\Repositories\TagRepository;

class TagService
{
    protected TagRepository $repository;

    public function __construct(TagRepository $repository)
    {
        $this->repository = $repository;
    }

    public function list()
    {
        return $this->repository->all();
    }

    public function store(array $data): Tag
    {
        return $this->repository->create($data);
    }

    public function update(Tag $tag, array $data): Tag
    {
        return $this->repository->update($tag, $data);
    }

    public function delete(Tag $tag): void
    {
        $this->repository->delete($tag);
    }
}
