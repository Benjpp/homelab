<?php

use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use SoftDeletes;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('document_type', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();

            $table->softDeletes();
        });

        DB::table('document_type')->insert([
            [
                "id" => 1,
                "name" => "file",
                "created_at" => Carbon::now()
            ],
            [
                "id" => 2,
                "name" => "directory",
                "created_at" => Carbon::now()
            ]
        ]);

        Schema::create('model_has_document', function (Blueprint $table) {
            $table->id();
            $table->string('path');
            $table->morphs('model');
            $table->unsignedBigInteger('document_type_id');
            $table->timestamps();

            $table->foreign('document_type_id')->references('id')->on('document_type');

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('model_has_document');
        Schema::dropIfExists('document_type');
    }
};
