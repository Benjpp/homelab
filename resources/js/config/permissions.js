import { Table } from "../components/table";
import { names as eventNames, permissionsEvents } from "../events/config-events";

let tablePermissions = null
let dtePermissions = null

function initDomRefs(){
    tablePermissions = document.querySelector("#permissions-table")
}

function initDTEPermissions(){
    dtePermissions = new Table(tablePermissions, "/permission/dt/delete", {
        ajax: {
            url: "/permission/getDatatable",
            type: "GET",
        },
        responsive: true,
        pageLength: 20,
        layout: {
            topStart: {
                buttons: [
                    {
                        text: '<i class="fa-solid fa-plus me-1"></i> Create',
                        className: 'btn btn-primary btn-sm', 
                        action: function (e, dt, node, config) {
                            document.dispatchEvent(permissionsEvents.create())
                        }
                    },
                    {
                        text: '<i class="fa-solid fa-rotate me-1"></i> Recargar',
                        className: 'btn btn-secondary btn-sm',
                        action: function (e, dt, node, config) {
                            dt.ajax.reload();
                        }
                    }
                ]
            }
        },
        columns: [
            { data: "id", title: "ID" },
            { data: "name", title: "NAME" },
            { data: "guard_name", title: "GUARD NAME" },
            { data: "actions", title: "#", render: (data, type, row) => `
                <button class="fa-solid fa-pencil btn btn-sm btn-primary" data-event="${eventNames.EDIT_PERMISSION}" data-id="${row.id}"></button>
                ` }
        ],
    }).onClickButton([
        eventNames.EDIT_PERMISSION,
    ]).buttons([
        Table.buttons.delete
    ])
}

function setupPermissions(){
    initDomRefs()
    initDTEPermissions()
} 

document.addEventListener("DOMContentLoaded", () => {
    setupPermissions()
    document.addEventListener(eventNames.REFRESH_PERMISSIONS, () => {
        console.log("reloading")
        dtePermissions.reload()
    })
    
    document.addEventListener(eventNames.DELETE_PERMISSION, (e) => {
        console.log("Delete permission")
    })
})