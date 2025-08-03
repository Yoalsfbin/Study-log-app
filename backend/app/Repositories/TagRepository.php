<?php

namespace App\Repositories;

use App\Models\Tag;

class TagRepository
{
    public function all()
    {
        return Tag::all();
    }

    public function create(array $data): Tag
    {
        return Tag::create($data);
    }

    public function update(Tag $tag, array $data): Tag
    {
        $tag->update($data);
        return $tag;
    }

    public function delete(Tag $tag): void
    {
        $tag->delete();
    }
}
