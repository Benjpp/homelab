@extends('app')
@section('content')

@can('cloud-storage.index')
<div class="banner bg-light text-white border-bottom p-2 rounded-0 mb-0">
    <div class="container">
        <ul class="nav nav-pills gap-0 list-unstyled mb-0" id="cloudStorageBannerUl">
            <li class="align-items-center d-flex">
                <button type="button" class="btn btn-sm btn-outline-secondary rounded-pill px-3" id="cloudStorageBackBtn">
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
            </li>
            <li class="nav-item cloudStorageBannerSpace">
                <span class="nav-link custom-tab-banner rounded-0 text-secondary" id="cloudStorageSpan">
                    <i class="fa-solid fa-angles-right text-secondary me-2"></i>Mis Documentos
                </span>
            </li>
        </ul>
    </div>
</div>

@include("cloud-storage.partials.documents")    

<!-- Modlas -->
@include("cloud-storage.modals.modal-directory")

<script src="{{ mix('js/cloud-storage/index.min.js') }}"></script>

@endcan

@endsection

