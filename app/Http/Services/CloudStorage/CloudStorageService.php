<?php

namespace App\Http\Services\CloudStorage;

use App\Http\Controllers\DocumentController;
use App\Http\Requests\CloudStorage\CreateDirectoryRequest;
use App\Http\Services\ModelHasDocumentService;
use Illuminate\Support\Facades\Auth;

class CloudStorageService 
{
    private const BASE_DIRECTORY = 'CLOUD/DOCS';
   
    public function __construct(private ModelHasDocumentService $modelHasDocumentService)
    {
    }

    public function createDirectory(CreateDirectoryRequest $request) : bool
    {
        $currentDir = $request->input('current_directory');
        $directoryName = $request->input('directory_name');

        $path = $this::BASE_DIRECTORY . $currentDir;

        return $this->modelHasDocumentService->createDirectory($path . "/" . $directoryName, 'cloud-storage', Auth::user()->id);
    }
}