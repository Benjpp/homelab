<?php

namespace App\Models\Document;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DocumentType extends Model
{
    use Timestamp, SoftDeletes;
    protected $fillable = [
        "name"
    ];

    protected $table = "document_type";
}
