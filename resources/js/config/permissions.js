import DataTable from "datatables.net-dt"

let tablePermissions = null
let dtePermissions = null

function initDomRefs(){
    tablePermissions = document.querySelector("#permissions-table")
}

function initDTEPermissions(){
    dtePermissions = new DataTable(tablePermissions, {
        ajax: {
            url: "/permission/getDatatable",
            type: "GET",
        },
        responsive: true,
        pageLength: 20,
        columns: [
            { data: "id", title: "ID" },
            { data: "name", title: "NAME" },
            { data: "guard_name", title: "GUARD NAME" }
        ],

    })
}

function setupPermissions(){
    initDomRefs()
    initDTEPermissions()
} 

document.addEventListener("DOMContentLoaded", () => {
    setupPermissions()
})