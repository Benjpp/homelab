<?php

namespace App\Models\Document;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ModelHasDocument extends Model
{
    use Timestamp, SoftDeletes;
    protected $fillable = [
        "model_type",
        "model_id",
        "path",
        "document_type_id"
    ];

    protected $table = "model_has_document";
}
