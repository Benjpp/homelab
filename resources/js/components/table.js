/**
 * Datatables .NET wrapper
 */

import DataTable from "datatables.net-dt";
import "datatables.net-buttons-dt";
import "datatables.net-select-dt"
import "datatables.net-select-dt/css/select.dataTables.css"; 
import { node } from "webpack";
import { fetchHeaders } from "../fetchHeaders";

export class Table {

    static buttons = {
        delete: {
            name: "delete",
            text: '<i class="fa-solid fa-trash"></i>',
            className: 'btn btn-danger btn-sm', 
        }
    }

    constructor(selector, deleteUrl, options = {}) {
        const selectColumn = {
            data: null,
            defaultContent: '',
            className: 'align-items-center select-checkbox',
            orderable: false,
            searchable: false
        };

        const userColumns = options.columns || [];
        const mergedColumns = [selectColumn, ...userColumns];

        const mergedOptions = {
            select: {
                style: "multi",
                selector: "td.select-checkbox"
            },
            order: [[1, 'asc']], 
            ...options,
            columns: mergedColumns
        };

        this.datatable = new DataTable(selector, mergedOptions);
        this.dteEvents = {};
        this.deleteUrl = deleteUrl
        this.datatable.deleteUrl = deleteUrl
    }

    /**
     * Reloads table data using ajax
     */
    reload() {
        this.datatable.rows().deselect()
        this.datatable.ajax.reload(null, false);
    }

    /**
     * @param {Array} events 
     * Receives the events to be triggered by the action column buttons
     */
    onClickButton(events) {
        // 'events' is an array of strings containing event names, e.g., ["editPermission"]
        events.forEach((eventName) => {
            if (eventName) {
                // Register the event in the map (true)
                this.dteEvents[eventName] = true;
            }
        });

        document.addEventListener('click', (e) => {
            const targetBtn = e.target.closest('[data-event]');
            if (!targetBtn) return;
            
            const eventName = targetBtn.dataset.event;

            // Check if the clicked element has a data-event attribute and is registered in our map
            if (eventName && this.dteEvents[eventName]) {
                const customEvent = new CustomEvent(eventName, {
                    bubbles: true,
                    detail: {
                        name: eventName,
                        id: e.target.dataset.id,
                        target: e.target,
                        originalEvent: e
                    }
                });

                targetBtn.dispatchEvent(customEvent);
            }
        });

        return this; // Enables method chaining after instantiation
    }

    /**
     * @param {Table.buttons} buttons - An array of buttons to add to the datatable. These are defined as static members of the wrapper table class.
     */
    buttons(buttons){
        let length = this.datatable.buttons().length
        buttons.forEach((button) => {
            const buttonConfig = {...button}
            if(buttonConfig.name === "delete"){
                buttonConfig.action = async (e, dt, node, config) => {
                    const selectedRows = dt.rows({selected: true}).data().toArray()
                    const selectedIds = selectedRows.map(row => row.id)

                    if(selectedIds.length === 0){
                        // TODO adding a toast like warning
                        console.log("No rows selected")
                        return
                    }

                    try{
                        const response = await fetch(this.deleteUrl, {
                            method: "DELETE",
                            headers: fetchHeaders,
                            body: JSON.stringify({ ids: selectedIds})
                        })

                        if(response.ok){
                            this.reload()
                        }else{
                            // TODO toast like warning
                        }
                    }catch(error){
                        console.error(error)
                        // TODO another toast like error
                    }
                }
            }

            this.datatable.button().add(length, buttonConfig)
            length++
        })
    }
}