/**
 *  CustomEvent definitions
 */

export const names = {
    CREATE_PERMISSION: "createPermission",
    EDIT_PERMISSION: "editPermission",
    DELETE_PERMISSION: "deletePermission",
    REFRESH_PERMISSIONS: "refreshPermissions",

    CREATE_USER: "createUser",
    EDIT_USER: "editUser",
    DELETE_USER: "deleteUser",
    REFRESH_USER: "refreshUser",
}

export const permissionsEvents = {
    create: (payload ={}) => new CustomEvent(names.CREATE_PERMISSION, {
        detail: {
            name: names.CREATE_PERMISSION,
            ...payload
        }
    }),
    edit: (payload = {}) => new CustomEvent(names.EDIT_PERMISSION, {
        detail: {
            name: names.EDIT_PERMISSION,
            ...payload
        }
    }),
    delete: (payload = {}) => new CustomEvent(names.DELETE_PERMISSION, {
        detail: {
            name: names.DELETE_PERMISSION,
            ...payload
        }
    }),
    refresh: (payload = {}) => new CustomEvent(names.REFRESH_PERMISSIONS, {
        detail: {
            name: names.REFRESH_PERMISSIONS,
            ...payload
        }
    })
}

export const userEvents = {
    create: (payload = {}) => new CustomEvent(names.CREATE_USER, {
        detail: {
            name: names.CREATE_USER,
            ...payload
        }
    }),
    edit: (payload = {}) => new CustomEvent(names.EDIT_USER, {
        detail: {
            name: names.EDIT_USER,
            ...payload
        }
    }),
    delete: (payload = {}) => new CustomEvent(names.DELETE_USER, {
        detail: {
            name: names.DELETE_USER,
            ...payload
        }
    }),
    refresh: (payload = {}) => new CustomEvent(names.REFRESH_USER, {
        detail: {
            name: names.REFRESH_USER,
            ...payload
        }
    })
}