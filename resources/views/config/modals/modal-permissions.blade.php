<div class="modal fade" id="modalPermissions">
    <div class="modal-dialog modal-xl">
        <div class="modal-content shadow">

            <div class="modal-header bg-dark text-white rounded-top px-4 py-3">
                <h5 class="modal-title fs-6 fw-semibold m-0">
                    <i class="fa-solid fa-key me-2"></i> Create Permission
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body p-4">
                <form id="formModalPermission" class="needs-validation" novalidate>
                    <div class="row justify-content-start">

                        <div class="col-12 col-md-6 border-end pe-md-4">
                            <div class="mb-3">
                                <label class="form-label fw-medium" for="inputPermissionName">
                                    Permission Name <span class="text-danger">*</span>
                                </label>
                                <input type="text" name="permission_name" class="form-control" id="inputPermissionName" placeholder="e.g. user.create" required />
                            </div>
                        </div>
                    
                        <div class="col-12 col-md-6 ps-md-4">
                            <div class="mb-3">
                                <label class="form-label fw-medium" for="inputGuardName">
                                    Guard Name <span class="text-danger">*</span>
                                </label>
                                <input type="text" name="guard_name" class="form-control" id="inputGuardName" placeholder="e.g. web" required />
                            </div>
                        </div>
                    
                    </div>
                </form>
            </div>

            <div class="modal-footer bg-light px-4 py-3">
                <button type="button" class="btn btn-sm btn-outline-secondary px-3" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" id="savePermissionsBtn" form="formModalPermission" class="btn btn-sm btn-primary px-3">
                    <i class="fa-solid fa-save me-1"></i> Save Permission
                </button>
            </div>

        </div>
    </div>
</div>

<script src="{{ mix('js/modal-permissions.min.js') }}"></script>