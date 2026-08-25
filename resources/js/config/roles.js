import DataTable from "datatables.net-dt"

let tableRoles = null
let dteRoles = null

function initDomRefs(){
    tableRoles = document.querySelector("#roles-table")
}

function initDTERoles(){
    tableRoles = new DataTable(tableRoles, {
        ajax: {
            url: "/role/getDatatable",
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

function setUpRoles(){
    initDomRefs()
    initDTERoles()
} 

document.addEventListener("DOMContentLoaded", () => {
    setUpRoles()
})