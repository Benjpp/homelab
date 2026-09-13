import { Table } from "../components/table"
import { names as eventNames, userEvents } from "../events/config-events"

let tableUsers = null
let dteUsers = null

function initDomRefs(){
    tableUsers = document.querySelector("#users-table")
}

function initDTEUsers(){
    dteUsers = new Table(tableUsers, "/user/delete", {
        ajax: {
            url: "/user/getDatatable",
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
                            document.dispatchEvent(userEvents.create())
                        }
                    }
                ]
            }
        },
        columns: [
            { data: "id", title: "ID" },
            { data: "name", title: "NAME" },
            { data: "email", title: "EMAIL" },
            { data: "actions", title: "#", render: (data, type, row) => `
                <button class="fa-solid fa-pencil btn btn-sm btn-primary" data-event="${eventNames.EDIT_USER}" data-id="${row.id}"></button>
                ` }
        ],

    }).onClickButton([
        eventNames.EDIT_USER
    ]).buttons([
        Table.buttons.delete
    ])
}

function setupUsers(){
    initDomRefs()
    initDTEUsers()
} 

document.addEventListener("DOMContentLoaded", () => {
    setupUsers()

    document.addEventListener(eventNames.REFRESH_USER, () => {
        dteUsers.reload()
    })
})