import { Toggle } from "@radix-ui/react-toggle"
import { Form } from "../../components/form"
import { Select } from "../../components/select"
import { names as eventNames, userEvents } from "../../events/config-events"
import { fetchHeaders } from "../../fetchHeaders"

let modalDom = null
let modalEdit = null
let modalUrl = null
let userId = null
let form = null
let formInstance = null
let selectPermissionsDom = null
let selectPermissions = null
let bootstrapModal = null
let inputUserName = null
let inputEmail = null
let passwordContainer = null
let saveBtn = null
let initialized = false

function initDomRefs(){
    modalDom = document.querySelector("#modalUsers")
    bootstrapModal = bootstrap.Modal.getOrCreateInstance(modalDom)
    inputUserName = document.querySelector("#inputUserName")
    inputEmail = document.querySelector("#inputEmail")
    selectPermissionsDom = document.querySelector("#selectPermissions")
    passwordContainer = document.querySelector("#passwordContainer")
    form = document.querySelector("#formModalUser")
    saveBtn = document.querySelector("#saveUsersBtn")
}

function initComponents(){
    modalUrl = modalEdit ? `/user/edit/${userId}` : "/user/store"
    if(!formInstance){
        formInstance = new Form(form, modalUrl, {
            method: modalEdit ? "PUT" : "POST",
            onSuccess: () => {
                bootstrapModal.hide()
                document.dispatchEvent(userEvents.refresh())
            }
        })
        const selectUrl = modalEdit ? `/user/permissions/not/${userId}` : '/permission/all'
        console.log(selectUrl)
        selectPermissions = new Select(selectPermissionsDom, selectUrl)
    }else{
        formInstance.setUrl(modalUrl)
        formInstance.setMethod(modalEdit ? "PUT" : "POST")
    }

    selectPermissions.init()
}
    
async function fillEditForm(){
    if(modalEdit){
        try{
            const response = await fetch(`/user/get/${userId}`, {
                method: "GET",
                headers: fetchHeaders
            })

            if(!response.ok){
                console.error("Error getting user data")
                return
            }
            
            const json = await response.json()
            formInstance.fillForm(json)
        }catch(error){
            console.error(error)
        }
    }
}

function togglePasswordInput(){
    if(!modalEdit){
        passwordContainer.classList.remove("d-none")
    }else{
        passwordContainer.classList.add("d-none")
    }
}

function initModalUser(){
    initDomRefs()
    initComponents()
    togglePasswordInput()
    formInstance.clearForm()
    bootstrapModal.show()
    initialized = true
    fillEditForm()
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener(eventNames.CREATE_USER, (e) => {
        console.log("User Create")
        modalEdit = false
        userId = null
        initModalUser()
    })

    document.addEventListener(eventNames.EDIT_USER, (e) => {
        modalEdit = true
        userId = e.target.dataset.id
        console.log("User edit ", userId)
        initModalUser()
    })
})