<div class="modal fade" id="modalDirectory">
    <div class="modal-dialog modal-s">
        <div class="modal-content shadow">

            <div class="modal-header bg-dark text-white rounded-top px-4 py-3">
                <h5 class="modal-title fs-6 fw-semibold m-0">
                    <i class="fa-solid fa-key me-2"></i> Create Directory
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body p-4">
                <form id="modalDirectoryForm" class="needs-validation" novalidate>
                    <div class="row justify-content-start">
                            <div class="col-12 col-md-12 border-end pe-md-4">
                                <div class="mb-3">
                                    <label class="form-label fw-medium" for="inputDirectoryName">
                                        Directory Name <span class="text-danger">*</span>
                                    </label>
                                    <input type="text" name="directory_name" class="form-control" id="inputDirectoryName" placeholder="Name..." required />
                                </div>

                                <input type="hidden" name="current_directory" id="currentDirectoryName" value="" />
                            </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer bg-light px-4 py-3">
                <button type="button" class="btn btn-sm btn-outline-secondary px-3" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" id="createDirectoryBtn" form="modalDirectoryForm" class="btn btn-sm btn-primary px-3">
                    <i class="fa-solid fa-save me-1"></i> Create Directory
                </button>
            </div>

        </div>
    </div>
</div>

<script src="{{ mix("js/cloud-storage/modal-directory.min.js") }}"></script>