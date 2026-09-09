@extends('app')
@section('content')

@can('cloud-storage.index')
<div class="banner bg-light text-white border-bottom p-2 rounded-0 mb-0">
    <div class="container">
        <ul class="nav nav-pills gap-3 list-unstyled mb-0">
            <li class="nav-item">
                <span class="nav-link custom-tab-banner rounded-0 text-secondary" id="cloudStorageSpan">
                    <i class="fa-solid fa-angles-right text-secondary me-2"></i> Mis Documentos
                </span>
            </li>
        </ul>
    </div>
</div>
    
@endcan

@endsection

