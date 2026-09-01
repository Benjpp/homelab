/**
 *  CustomEvent definitions
 */

export const names = {
    CREATE_PERMISSION: "createPermission",
    EDIT_PERMISSION: "editPermission",
    DELETE_PERMISSION: "deletePermission",
    REFRESH_PERMISSIONS: "refreshPermissions",
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