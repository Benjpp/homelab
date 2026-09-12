<?php

namespace App\Http\Services;

use App\Http\Controllers\CloudStorage\CloudStorageController;
use App\Models\Document\DocumentType;
use App\Models\Document\ModelHasDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ModelHasDocumentService
{
    private const CONVERT = [
        'cloud-storage' => CloudStorageController::class
    ];

    /**
     * Creates a directory inside the given path with the given name. Returns true on success, false on failure
     * @param mixed $path
     * @return bool
     */
    public function createDirectory($path, $model_type, $model_id)
    {
        $success = Storage::disk('local')->makeDirectory($path);

        if(!$success){
            // TODO Log the failure or sum 
        }else{
            // TODO Log the success or sum too
            $document_type = DocumentType::where('name', 'directory')->first();
            ModelHasDocument::create([
                "model_type" => $this::CONVERT[$model_type],
                "model_id" => $model_id,
                "path" => $path,
                "document_type_id" => $document_type->id
            ]);
        }

        return $success;
    }

    public function createFile($path, $model_type, $model_id, $base64)
    {
        if(str_contains($base64, ',')){
            $pos = strrpos($base64, ',');
            $base64 = substr($base64, $pos + 1);
        }
        
        $fileData = base64_decode($base64);
        $success = Storage::disk('local')->put($path, $fileData);

        if(!$success){
            // TODO Log the failure or sum 
        }else{
            // TODO Log the success or sum too
            $document_type = DocumentType::where('name', 'file')->first();
            ModelHasDocument::create([
                "model_type" => $this::CONVERT[$model_type],
                "model_id" => $model_id,
                "path" => $path,
                "document_type_id" => $document_type->id
            ]);
        }

        return $success;
    }

    public function getFile($id)
    {
        $document = ModelHasDocument::findOrFail($id);
        return Storage::response($document->path);
    }

    public function downloadFile($id)
    {
        $document = ModelHasDocument::findOrFail($id);
        return Storage::download($document->path, basename($document->path));
    }

    /**
     * Deletes the files/directories with the given id stored in the documents table. Returns true if one has failed
     * @param mixed $ids
     */
    public function delete($ids){
        $failed = false;
        $directory_type_id = DocumentType::where('name', 'directory')->first();

        foreach($ids as $id){
            $document = null;
            try{
                $document = ModelHasDocument::findOrFail($id);
            }catch(\Exception $e){
                // TODO Log the failure
                $failed = true;
                continue;
            }

            $deleted = false;
            if($document->document_type_id == $directory_type_id->id){
                $deleted = Storage::disk('local')->deleteDirectory($document->path);
            }else{
                $deleted = Storage::disk('local')->delete($document->path);
            }

            if(!$deleted){
                // TODO Log storage delete error
                $failed = true;
                continue;
            }

            $document->delete();
        }

        return $failed;
    }
}
