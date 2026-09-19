<?php

namespace App\Http\Services\CloudStorage;

use App\Http\Controllers\CloudStorage\CloudStorageController;
use App\Http\Controllers\DocumentController;
use App\Http\Requests\CloudStorage\CreateDirectoryRequest;
use App\Http\Requests\UploadFileRequest;
use App\Http\Services\ModelHasDocumentService;
use App\Models\Document\DocumentType;
use App\Models\Document\ModelHasDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CloudStorageService 
{
    private const MODEL_TYPE = 'cloud-storage';
    private const BASE_DIRECTORY = 'CLOUD/DOCS';
   
    public function __construct(private ModelHasDocumentService $modelHasDocumentService)
    {
    }

    public function createDirectory(CreateDirectoryRequest $request) : bool
    {
        $currentDir = $request->input('current_directory');
        $directoryName = $request->input('directory_name');

        $path = $this::BASE_DIRECTORY . $currentDir;
       
        return $this->modelHasDocumentService->createDirectory($path . "/" . $directoryName, $this::MODEL_TYPE, Auth::user()->id);
    }

    // Can receive multiple files. Returns true if at least one file was uploaded. 
    // TODO In case of failing to upload any file, log the failure or sum like that 
    public function uploadFile(UploadFileRequest $request) : bool 
    {
        $files = $request->input('files');

        if (isset($files['filename'])) {
            $files = [$files]; 
        }

        $directory_path = $request->input('current_directory');
        $successOne = false;

        forEach($files as $file){
            $filename = $file["filename"];
            $base64 = $file["base64"];
            $path = $this::BASE_DIRECTORY . $directory_path . "/" . $filename;

            $created = $this->modelHasDocumentService->createFile(
                $path, 
                $this::MODEL_TYPE, 
                Auth::id(), 
                $base64
            );
    
            if ($created) {
                $successOne = true;
            }
        }

        return $successOne;
    }

    // The received payload is equal to the same received in upload file, with the distinction that intermediate directories must be created in the DB
    // To correctly query the virtual file exploration
    public function uploadDirectory(UploadFileRequest $request) : bool
    {
        $files = $request->input('files');

        if(isset($files['filename'])) {
            $files = [$files];
        }

        $basePath = trim($this::BASE_DIRECTORY . $request->input('current_directory'), '/');

        // 1. Collect all unique directory segments needed
        $allNeededDirs = [];
        foreach($files as $file){
            $relativePath = $file["filename"];
            $fullPath = $basePath . '/' . ltrim($relativePath, '/');
            $dirPath = dirname($fullPath);

            $parts = explode('/', $dirPath);
            $cumulative = '';
            foreach($parts as $part){
                $cumulative .= ($cumulative ? '/' : '') . $part;
                $allNeededDirs[$cumulative] = true;
            }
        }

        $uniqueDirs = array_keys($allNeededDirs);

        // 2. Determine which directories are missing from the database
        $existingDirs = ModelHasDocument::where('model_type', CloudStorageController::class)
            ->where('model_id', Auth::id())
            ->whereIn('path', $uniqueDirs)
            ->pluck('path')
            ->toArray();

        $missingDirs = array_diff($uniqueDirs, $existingDirs);

        // 3. Use the existing service method to create missing directories
        if(!empty($missingDirs)){
            foreach($missingDirs as $dir){
                if(!str_starts_with($dir, $this::BASE_DIRECTORY) || $dir == $this::BASE_DIRECTORY) continue;
                $this->modelHasDocumentService->createDirectory($dir, $this::MODEL_TYPE, Auth::id());
            }
        }

        // 4. Upload the files themselves
        $successOne = false;
        foreach($files as $file){
            $relativePath = $file["filename"];
            $fullPath = $basePath . '/' . ltrim($relativePath, '/');
            if($this->modelHasDocumentService->createFile($fullPath, $this::MODEL_TYPE, Auth::id(), $file["base64"])){
                $successOne = true;
            }
        }

        return $successOne;
    }

    public function getFile($id)
    {
        try{
            return $this->modelHasDocumentService->getFile($id);
        }catch(\Exception $e){
            return ["error" => $e->getMessage()];
        }
    }

    public function downloadFile($id)
    {
        return $this->modelHasDocumentService->downloadFile($id);
    }

    public function deleteFile(Request $request)
    {
        $idArray = (array)$request->input('ids');

        if($idArray == null){
            return false;
        }else{
            return $this->modelHasDocumentService->delete($idArray);
        }
    }
}