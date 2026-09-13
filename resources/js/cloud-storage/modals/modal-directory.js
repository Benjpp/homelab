import { Form } from "../../components/form"
import { names as cloudStorageEventNames, cloudStorageEvents } from "../../events/cloud-storage-events"

let modalDom = null
let currentDirectory = null
let bootstrapModal = null
let form = null
let formInstance = null

function initDomRefs(){
    modalDom = document.querySelector("#modalDirectory")
    bootstrapModal = bootstrap.Modal.getOrCreateInstance(modalDom, { keyboard: true })
    form = document.querySelector("#modalDirectoryForm")
    currentDirectory = document.querySelector("#currentDirectoryName")
    console.log("Current directory ", currentDirectory.value)
}

function initComponents(){
    formInstance = new Form(form, "/cloud-storage/create/dir", {
        method: "POST",
        onSuccess: () => {
            bootstrapModal.hide()
            document.dispatchEvent(cloudStorageEvents.refresh())
        }
    })
}

function setUpModalDirectory(){
    initDomRefs()
    initComponents()
    formInstance.clearForm()
    bootstrapModal.show()
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener(cloudStorageEventNames.CREATE_DIRECTORY, () => {
        console.log("Creating cloud storage directory")
        setUpModalDirectory()
    })
})