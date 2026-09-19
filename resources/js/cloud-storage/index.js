import { Table } from "../components/table"
import { cloudStorageEvents, names as cloudStorageEventNames } from "../events/cloud-storage-events"
import { fetchHeaders } from "../fetchHeaders"

let storageTable = null
let storageDTE = null
let currentDirectory = null
let backBtn = null
let fileInput = null
let directoryInput = null

function initDomRefs(){
    storageTable = document.querySelector("#documents-table")
    currentDirectory = document.querySelector("#currentDirectoryName")
    backBtn = document.querySelector("#cloudStorageBackBtn")

    directoryInput = document.createElement("input")
    directoryInput.type = "file"
    directoryInput.webkitdirectory = true
    directoryInput.directory = true
    directoryInput.multiple = true
    
    fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.multiple = true
    backBtn.disabled = true
    currentDirectory.value = ""
}

async function readFile(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file, 'UTF-8')
        
        reader.onload = readerEvent => {
            var content = readerEvent.target.result
            resolve(content)
        }

        reader.onerror = error => {
            reject(error)
            console.log("Reject: ", error)
        }
    })
}

function initComponents(){
    
    // Init the directory input listener
    directoryInput.onchange = async (e) => {
        console.log("On directory change")
        const files = Array.from(e.target.files)

        if (files.length === 0) return

        try{
            const payload = await Promise.all(
                files.map(async (file) => {
                    const content = await readFile(file)
                    return {
                        filename: file.webkitRelativePath || file.name,
                        base64: content
                    }
                })
            )

            // Send the files payload and target directory to the server
            const response = await fetch("/cloud-storage/upload/dir", {
                method: "POST",
                headers: fetchHeaders,
                body: JSON.stringify({
                    files: payload,
                    current_directory: currentDirectory.value
                })
            });

            console.log("Sent file. Body: ", {files: payload, current_directory: currentDirectory.value});

            // Handle HTTP error statuses
            if (!response.ok) {
                console.warn("Response not ok on file upload");
                return;
            }

            // Reload the DataTables/Storage component on successful upload
            storageDTE.reload();

        } catch (error) {
            // Catch and log file reading or network errors
            console.error("Error processing or uploading files:", error);
        } finally {
            // Reset input value to allow re-uploading the same file if needed
            directoryInput.value = "";
        }
    }

    // Init the file input listener
    fileInput.onchange = async (e) => {
        console.log("On change file");

        // Convert FileList to a standard Array to use array methods like .map()
        const files = Array.from(e.target.files);
        console.log("Number of files = ", files.length)
        if (files.length === 0) return;

        try {
            // Read all selected files concurrently and wait for all promises to resolve
            const payload = await Promise.all(
                files.map(async (file) => {
                    // Asynchronously read the file content as Base64/Data URL
                    const content = await readFile(file);
                    return {
                        filename: file.name,
                        base64: content
                    };
                })
            );

            // Send the files payload and target directory to the server
            const response = await fetch("/cloud-storage/upload/file", {
                method: "POST",
                headers: fetchHeaders,
                body: JSON.stringify({
                    files: payload,
                    current_directory: currentDirectory.value
                })
            });

            console.log("Sent file. Body: ", {files: payload, current_directory: currentDirectory.value});

            // Handle HTTP error statuses
            if (!response.ok) {
                console.warn("Response not ok on file upload");
                return;
            }

            // Reload the DataTables/Storage component on successful upload
            storageDTE.reload();

        } catch (error) {
            // Catch and log file reading or network errors
            console.error("Error processing or uploading files:", error);
        } finally {
            // Reset input value to allow re-uploading the same file if needed
            fileInput.value = "";
        }
    }

    // Init the go back button for folder navigation
    backBtn.addEventListener("click", () => {
        // Early return if already base directory
        if(currentDirectory.value === ""){
            console.log("Already in base directory")
            backBtn.disabled = true
            return
        }

        const path = currentDirectory.value
        const index = path.lastIndexOf('/')
        currentDirectory.value = path.substr(0, index)
        console.log("Current directory: ", currentDirectory.value)
        const container = document.querySelector("#cloudStorageBannerUl")
        const rightMostChild = container.childNodes[container.childNodes.length - 1]

        if(rightMostChild){
            container.removeChild(rightMostChild)
        }

        // Disable button if we are back in base directory
        if(currentDirectory.value === ""){
            backBtn.disabled = true
        }

        fetchDirectroyContents()
    })
}

function initDTEDocuments(){
    if(!storageTable){
        console.warn("Table storage null")
        return
    }
    storageDTE = new Table(storageTable, "/cloud-storage/deleteFile", {
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
                        text: '<i class="fa-solid fa-file-arrow-up"></i> ',
                        className: 'btn btn-primary btn-sm',
                        action: function (e, dt, node, config){
                            document.dispatchEvent(cloudStorageEvents.uploadFile())
                        }
                    },
                    {
                        text: '<i class="fa-solid fa-folder-open"></i> ',
                        className: 'btn btn-primary btn-sm',
                        action: function (e, dt, node, config){
                            document.dispatchEvent(cloudStorageEvents.uploadDirectory())
                        }
                    },
                    {
                        text: '<i class="fa-solid fa-folder-plus">',
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
                    return `<i class="fa-solid fa-file"></i> <a href="/cloud-storage/getFile/${row.id}"> ${data}</a>`
                }
            }},
            { data: "actions", title: "#", render: (data, type, row) => row.is_dir ? `
                <button class="fa-solid fa-folder-open btn btn-sm btn-primary" data-event="${cloudStorageEventNames.OPEN_DIRECTORY}" data-name="${row.filename}" data-id="${row.id}"></button>
            ` : `<button class="fa-solid fa-download btn btn-sm btn-success" data-event="${cloudStorageEventNames.DOWNLOAD_FILE}" data-id="${row.id}"></button>` }
        ]
    }).buttons([
        Table.buttons.delete
    ]).onClickButton([
        cloudStorageEventNames.OPEN_DIRECTORY,
        cloudStorageEventNames.DOWNLOAD_FILE
    ])
}

function setUpCloudStorage(){
    initDomRefs()
    initComponents()
    initDTEDocuments()
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Setting up cloud")
    setUpCloudStorage() 

    document.addEventListener(cloudStorageEventNames.REFRESH, () => {
        storageDTE.reload()
    })

    document.addEventListener(cloudStorageEventNames.OPEN_DIRECTORY, (e) => {
        console.log("Cloud Storage: Opening directroy")
        openDirectory(e)
    })

    document.addEventListener(cloudStorageEventNames.UPLOAD_FILE, (e) => {
        console.log("Cloud Storage: Uploading file")
        fileInput.click()
    })

    document.addEventListener(cloudStorageEventNames.UPLOAD_DIRECTORY, (e) => {
        console.log("Cloud sotrage: upload directory")
        directoryInput.click()
    })

    document.addEventListener(cloudStorageEventNames.DOWNLOAD_FILE, (e) => {
        console.log("Downloading file. ID: ", e.target.dataset.id)
        downloadFile(e.target.dataset.id)
    })
})

// ================= HELPERS =================
function fetchDirectroyContents(){
    storageDTE.setPayload({ directory_path: currentDirectory.value })
    storageDTE.reload()
}

function openDirectory(event){
    backBtn.disabled = false
    currentDirectory.value = `${currentDirectory.value}/${event.target.dataset.name}`
    console.log(`Opening folder: ${currentDirectory.value}`)

    const container = document.querySelector("#cloudStorageBannerUl")
    const nuevoLi = document.createElement('li')
    nuevoLi.className = 'nav-item cloudStorageBannerSpace'
    nuevoLi.innerHTML = `<span class="nav-link custom-tab-banner rounded-0 text-secondary">
        <i class="fa-solid fa-angles-right text-secondary me-2"></i>${event.target.dataset.name}
        </span>
    `

    container.appendChild(nuevoLi)
    fetchDirectroyContents()
}

async function downloadFile(fileId){
    try{
        const response = await fetch(`/cloud-storage/downloadFile/${fileId}`, {
            headers: fetchHeaders,
            method: "GET"
        });

        if (!response.ok) {
            console.warn("Response not ok on file download");
            return;
        }

        const blob = await response.blob();
        
        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'documento'; 

        if (contentDisposition) {
            const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';\n]+)["']?/i);
            if (match && match[1]) {
                filename = decodeURIComponent(match[1]);
            }
        }

        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;

        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(downloadUrl);

        // TODO Toast like success
    }catch(error){
        // TODO Toast like error
        console.log(error)
    }
}