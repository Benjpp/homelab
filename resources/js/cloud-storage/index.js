import { Table } from "../components/table"
import { cloudStorageEvents, names as cloudStorageEventNames } from "../events/cloud-storage-events"

let storageTable = null
let storageDTE = null
let currentDirectory = null

function initDomRefs(){
    storageTable = document.querySelector("#documents-table")
    currentDirectory = document.querySelector("#currentDirectoryName")
    currentDirectory.value = ""
}

function initDTEDocuments(){
    if(!storageTable){
        console.warn("Table storage null")
        return
    }
    storageDTE = new Table(storageTable, "", {
        ajax: {
            url: "/cloud-storage/getDatatable",
            type: "GET",
            data: function(d) {
                d.directory_path = currentDirectory.value
            }
        },
        responsive: true,
        pagelength: 20,
        layout: {
            topStart: {
                buttons: [
                    {
                        text: '<i class="fa-solid fa-arrow-up me-1"></i> <i class="fa-solid fa-file"></i>',
                        className: 'btn btn-primary btn-sm',
                        action: function (e, dt, node, config){
                            document.dispatchEvent(cloudStorageEvents.uploadFile())
                        }
                    },
                    {
                        text: '<i class="fa-solid fa-plus me-1"></i> <i class="fa-solid fa-folder"></i>',
                        className: 'btn btn-warning btn-sm',
                        action: function(e, dt, node, config){
                            document.dispatchEvent(cloudStorageEvents.createDirectory())
                        }
                    }
                ]
            }
        },
        columns: [
            { data: "filename", title: "FILENAME", render: (data, type, row) => {
                if(row.is_dir){
                    return `<i class="fa-solid fa-folder"></i> ${data}`
                }else{
                    return `<i class="fa-solid fa-file"></i> ${data}`
                }
            }},
            { data: "actions", title: "#", render: (data, type, row) => `
                <button class="fa-solid fa-folder-open btn btn-sm btn-primary" data-event="${cloudStorageEventNames.OPEN_DIRECTORY}" data-name="${row.filename}" data-id="${row.id}"></button>
            ` }
        ]
    }).buttons([
        Table.buttons.delete
    ]).onClickButton([
        cloudStorageEventNames.OPEN_DIRECTORY
    ])
}

function setUpCloudStorage(){
    initDomRefs()
    initDTEDocuments()
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Setting up cloud")
    setUpCloudStorage() 

    document.addEventListener(cloudStorageEventNames.REFRESH, () => {
        storageDTE.reload()
    })

    document.addEventListener(cloudStorageEventNames.OPEN_DIRECTORY, (e) => {
        currentDirectory.value = `${currentDirectory.value}/${e.target.dataset.name}`
        console.log(`Opening folder: ${currentDirectory.value}`)

        const container = document.querySelector("#cloudStorageBannerUl")
        const nuevoLi = document.createElement('li')
        nuevoLi.className = 'nav-item cloudStorageBannerSpace'
        nuevoLi.innerHTML = `<span class="nav-link custom-tab-banner rounded-0 text-secondary">
            <i class="fa-solid fa-angles-right text-secondary me-2"></i>${e.target.dataset.name}
            </span>
        `
        container.appendChild(nuevoLi)

        storageDTE.setPayload({
            directory_path: currentDirectory.value
        })
        storageDTE.reload()
    })
})