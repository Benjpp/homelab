<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('model_has_document', function (Blueprint $table) {
            $table->string('hash', 64)->index()->nullable();
        });

        $nonHashed = DB::table('model_has_document')->whereNull('hash')->get();
        foreach($nonHashed as $file){
            $path = Storage::path($file->path);

            if(file_exists($path) && is_file($path)){
                $hash = hash_file('sha256', $path);

                DB::table('model_has_document')->where('id', $file->id)->update(['hash' => $hash]);
            }else{
                // TODO Log warning
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('model_has_document', function (Blueprint $table) {
            $table->dropColumn('hash');
        });
    }
};
