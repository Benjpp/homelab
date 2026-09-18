<?php

namespace App\Http\Controllers\CloudStorage;

use App\Http\Controllers\Controller;
use App\Http\Requests\CloudStorage\CreateDirectoryRequest;
use App\Http\Requests\UploadFileRequest;
use App\Http\Services\CloudStorage\CloudStorageService;
use App\Models\Document\DocumentType;
use App\Models\Document\ModelHasDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Yajra\DataTables\Facades\DataTables;

class CloudStorageController extends Controller
{
    public function __construct(private CloudStorageService $cloudStorageService)
    {
    }

    private const BASE_DIRECTORY = 'CLOUD/DOCS';

    public function getDatatable(Request $request)
    {
        $directory_path = $this::BASE_DIRECTORY . $request->input("directory_path", "");
        $query = ModelHasDocument::where('model_type', $this::class)->where('model_id', Auth::user()->id)->get();
        $files = [];
        
        foreach($query as $file){
            if(dirname($file->path) == $directory_path){
                $files[] = $file;
            }
        }

        return DataTables::of(collect($files))
            ->addColumn('filename', function($m) {
                return basename($m->path);
            })
            ->addColumn('is_dir', function($m) {
                $directory_type_id = DocumentType::where('name', 'directory')->first();
                return $m->document_type_id == $directory_type_id->id;
            })
            ->make(true);
    }    

    public function uploadFile(UploadFileRequest $uploadFileRequest)
    {
        $success = $this->cloudStorageService->uploadFile($uploadFileRequest);

        if(!$success){
            return response()->json([
                "success" => false,
                "error" => "Error uploading file"
            ], 500);
        }else{
            return response()->json([
                "success" => true
            ], 200);
        }
    }

    public function uploadDirectory(UploadFileRequest $uploadFileRequest){
        $success = $this->cloudStorageService->uploadDirectory($uploadFileRequest);

        if(!$success){
            return response()->json([
                "success" => false,
                "error" => "Error uploading file"
            ], 500);
        }else{
            return response()->json([
                "success" => true
            ], 200);
        }
    }

    public function createDirectory(CreateDirectoryRequest $createDirectoryRequest)
    {
        $success = $this->cloudStorageService->createDirectory($createDirectoryRequest);

        if(!$success){
            return response()->json([
                "success" => false,
                "error" => "Error creating directory"
            ], 500);
        }else{
            return response()->json([
                "success" => true
            ], 200);
        }
    }

    public function getFile($id)
    {
        return $this->cloudStorageService->getFile($id);
    }

    public function downloadFile($id)
    {
        return $this->cloudStorageService->downloadFile($id);
    }

    public function deleteFile(Request $request)
    {
        $failedOne = $this->cloudStorageService->deleteFile($request);

        if($failedOne){
            return response()->json([
                "error" => "File/s could not be deleted"
            ], 500);
        }else{
            return response()->json([
                "success" => true
            ], 200);
        }
    }
}
