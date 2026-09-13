<div class="modal fade" id="modalUsers">
    <div class="modal-dialog modal-xl">
        <div class="modal-content shadow">

            <div class="modal-header bg-dark text-white rounded-top px-4 py-3">
                <h5 class="modal-title fs-6 fw-semibold m-0">
                    <i class="fa-solid fa-key me-2"></i> Create User
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body p-4">
                <form id="formModalUser" class="needs-validation" autocomplete="off" novalidate>
                    <div class="row justify-content-start">

                        <div class="col-12 col-md-6 border-end pe-md-4">
                            <div class="mb-3">
                                <label class="form-label fw-medium" for="inputUserName">
                                    User Name <span class="text-danger">*</span>
                                </label>
                                <input type="text" name="user_name" autocomplete="off" class="form-control" id="inputUserName" placeholder="e.g. user.create" required />
                            </div>
                        </div>
                    
                        <div class="col-12 col-md-6 ps-md-4">
                            <div class="mb-3">
                                <label class="form-label fw-medium" for="inputGuardName">
                                    Email <span class="text-danger">*</span>
                                </label>
                                <input type="email" name="email" class="form-control" id="inputEmail" placeholder="e.g. example@gmail.com" required />
                            </div>
                        </div>

                    
                    </div>

                    <div class="row justify-content-start">
                        
                        <div class="col-12 col-md-6 border-end pe-md-4" id="passwordContainer">
                            <div class="mb-3">
                                <label class="form-label fw-medium" for="inputPassword">
                                    Password <span class="text-danger">*</span>
                                </label>
                                <input type="password" name="password" autocomplete="new-password" class="form-control" id="inputPassword" />
                            </div>
                        </div>

                        <div class="col-12 col-md-6 ps-md-4">
                            <div class="mb-3">
                                <label class="form-label fw-medium" for="selectPermissions">
                                    Assign Permissions
                                </label>
                                <select name="permissions" class="form-select" multiple id="selectPermissions"></select>
                            </div>
                        </div>

                    </div>
                </form>
            </div>

            <div class="modal-footer bg-light px-4 py-3">
                <button type="button" class="btn btn-sm btn-outline-secondary px-3" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" id="saveUsersBtn" form="formModalUser" class="btn btn-sm btn-primary px-3">
                    <i class="fa-solid fa-save me-1"></i> Save User
                </button>
            </div>

        </div>
    </div>
</div>

<script src="{{ mix('js/modal-users.min.js') }}"></script>