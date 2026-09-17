export const names = {
    UPLOAD_FILE: "uploadFile",
    CREATE_DIRECTORY: "createDir",
    DELETE_FILE: "deleteFile",
    REFRESH: "refreshCloudStorage",
    OPEN_DIRECTORY: "openDirectory",
    DOWNLOAD_FILE: "downloadFile",
    UPLOAD_DIRECTORY: "uploadDirectory"
}

export const cloudStorageEvents = {
    uploadFile: (payload = {}) => new CustomEvent(names.UPLOAD_FILE, {
        detail: {
            name: names.UPLOAD_FILE,
            ...payload
        }
    }),

    createDirectory: (payload = {}) => new CustomEvent(names.CREATE_DIRECTORY, {
        detail: {
            name: names.CREATE_DIRECTORY,
            ...payload
        }
    }),

    deleteFile: (payload = {}) => new CustomEvent(names.DELETE_FILE, {
        detail: {
            name: names.DELETE_FILE,
            ...payload
        }
    }),

    refresh: (payload = {}) => new CustomEvent(names.REFRESH, {
        detail: {
            name: names.REFRESH,
            ...payload
        }
    }),

    openDirectory: (payload = {}) => new CustomEvent(names.OPEN_DIRECTORY, {
        detail: {
            name: names.OPEN_DIRECTORY,
            ...payload
        }
    }),

    downloadFile: (payload = {}) => new CustomEvent(names.DOWNLOAD_FILE, {
        detail: {
            name: names.DOWNLOAD_FILE,
            ...payload
        }
    }),

    uploadDirectory: (payload = {}) => new CustomEvent(names.UPLOAD_DIRECTORY, {
        detail: {
            name: names.UPLOAD_DIRECTORY,
            ...payload
        }
    })
}