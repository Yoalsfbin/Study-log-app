<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Models\Tag;
use App\Services\TagService;

class TagController extends Controller
{
    protected TagService $service;

    public function __construct(TagService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json($this->service->list());
    }

    public function store(StoreTagRequest $request)
    {
        $tag = $this->service->store($request->validated());
        return response()->json($tag, 201);
    }

    public function update(UpdateTagRequest $request, Tag $tag)
    {
        $tag = $this->service->update($tag, $request->validated());
        return response()->json($tag);
    }

    public function destroy(Tag $tag)
    {
        $this->service->delete($tag);
        return response()->noContent();
    }
}
