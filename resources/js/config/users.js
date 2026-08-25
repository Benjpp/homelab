import DataTable from "datatables.net-dt"

let tableUsers = null
let dteUsers = null

function initDomRefs(){
    tableUsers = document.querySelector("#users-table")
}

function initDTEUsers(){
    dteUsers = new DataTable(tableUsers, {
        ajax: {
            url: "/user/getDatatable",
            type: "GET", 
        },
        responsive: true,
        pageLength: 20,
        columns: [
            { data: "id", title: "ID" },
            { data: "name", title: "NAME" },
            { data: "email", title: "EMAIL" }
        ],

    })
}

function setupUsers(){
    initDomRefs()
    initDTEUsers()
} 

document.addEventListener("DOMContentLoaded", () => {
    setupUsers()
})