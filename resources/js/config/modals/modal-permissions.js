import { permission } from "process";
import { Form } from "../../components/form";
import { names as eventNames, permissionsEvents } from "../../events/config-events";
import { fetchHeaders } from "../../fetchHeaders";

let modalDom = null
let modalEdit = null
let permissionId = null
let bootstrapModal = null
let inputPermissionName = null
let inputGuardName = null
let form = null
let formInstance = null
let saveBtn = null

function initDomRefs(){
    modalDom = document.querySelector("#modalPermissions")
    bootstrapModal = bootstrap.Modal.getOrCreateInstance(modalDom)
    inputPermissionName = document.querySelector("#inputPermissionName")
    inputGuardName = document.querySelector("#inputGuardName")
    form = document.querySelector("#formModalPermission")
    saveBtn = document.querySelector("#savePermissionsBtn")
}

async function initComponents(){
    if(!formInstance){
        formInstance = new Form(form, "/permission/store", {
            method: modalEdit ? "PUT" : "POST",
            onSuccess: () => {
                bootstrapModal.hide()
                document.dispatchEvent(permissionsEvents.refresh())
            }
        })
    }

    // If edit mode is true, fill form with data and change submit url endpoint
    if(modalEdit){
        try{
            const response = await fetch(`/permission/get/${permissionId}`, {
                method: "GET",
                headers: fetchHeaders
            })

            if(!response.ok){
                console.error("Error getting permission data")
                return
            }

            const data = await response.json()
            formInstance.fillForm(data)
        }catch(error){
            console.error(error)
        }
    }
}

function initModalPermission(){
    initDomRefs()
    initComponents()
    bootstrapModal.show()
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener(eventNames.CREATE_PERMISSION, () => {
        initModalPermission()
    })

    document.addEventListener(eventNames.EDIT_PERMISSION, (e) => {
        console.log("Edit permission")
        modalEdit = true
        permissionId = e.target.dataset.id
        initModalPermission()
    })
})