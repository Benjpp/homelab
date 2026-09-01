@extends('app')

@section('content')

<div class="banner bg-light border-bottom text-white p-2 rounded-0 mb-0">
    <div class="container">
        <ul class="nav nav-pills gap-3 list-unstyled" id="configTabs" role="tablist">
            @can('user.index')
            <li class="nav-item" role="presentation">
                <button class="nav-link custom-tab rounded-0 active" id="user-tab" data-bs-toggle="tab" data-bs-target="#user-tab-pane" type="button" 
                    role="tab" aria-controls="user-tab-pane" aria-selected="true">
                    <i class="fa-solid fa-user me-2"></i> Users
                </button>
            </li>
            @endcan
            @can('role.index')
            <li class="nav-item" role="presentation">
                <button class="nav-link custom-tab rounded-0" id="roles-tab" data-bs-toggle="tab" data-bs-target="#roles-tab-pane" type="button" 
                    role="tab" aria-controls="roles-tab-pane" aria-selected="false">
                    <i class="fa-solid fa-user-shield me-2"></i> Roles
                </button>
            </li>
            @endcan
            @can('permission.index')
            <li class="nav-item" role="presentation">
                <button class="nav-link custom-tab rounded-0" id="permissions-tab" data-bs-toggle="tab" data-bs-target="#permissions-tab-pane" type="button" 
                    role="tab" aria-controls="permissions-tab-pane" aria-selected="false">
                    <i class="fa-solid fa-key me-2"></i> Permissions
                </button>
            </li>
            @endcan
        </ul>
    </div>
</div>

<!-- Contenido de las Pestañas -->
<div class="container">
    <div class="tab-content" id="configTabsContent">
        <!-- Pestaña 1: Usuarios -->
        @can('user.index')
        <div class="tab-pane fade show active" id="user-tab-pane" role="tabpanel" aria-labelledby="user-tab" tabindex="0">
            @include('config.partials.users')
        </div>
        @endcan

        <!-- Pestaña 2: Roles -->
        @can('role.index')
        <div class="tab-pane fade" id="roles-tab-pane" role="tabpanel" aria-labelledby="roles-tab" tabindex="0">
            @include('config.partials.roles')
        </div>
        @endcan

        <!-- Pestaña 3: Permisos -->
        @can('permission.index')
        <div class="tab-pane fade" id="permissions-tab-pane" role="tabpanel" aria-labelledby="permissions-tab" tabindex="0">
            @include('config.partials.permissions')
        </div>
        @endcan
    </div>
</div>

<!-- Modals -->
@include('config.modals.modal-permissions')

@endsection
