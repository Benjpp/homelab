/**
 * Form wrapper
 */

import { fetchHeaders } from "../fetchHeaders"

export class Form {
    /**
     * @param {HTMLElement|string} domItem - <form> HTML element or its CSS selector
     * @param {string|null} url - Endpoint URL for submission
     * @param {Object} options - Optional callbacks for onSuccess, onError, and HTTP method
     */
    constructor(domItem, url = null, options = {}) {
        this.form = typeof domItem === "string" ? document.querySelector(domItem) : domItem;
        this.url = url;
        this.onSuccess = options.onSuccess || null;
        this.onError = options.onError || null;
        this.httpMethod = options.method;

        if (!this.form) {
            console.error("Form wrapper: <form> element not found");
            return;
        }

        this.initEvents();
    }

    initEvents() {
        this.form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // 1. Enable Bootstrap validation styles
            this.form.classList.add("was-validated");

            // 2. Stop execution if native validation fails (required, pattern, etc.)
            if (!this.form.checkValidity()) {
                return;
            }

            const data = this.getData();

            try {
                const response = await fetch(this.url, {
                    method: this.httpMethod,
                    headers: fetchHeaders, // Ensure it includes 'Content-Type': 'application/json' and 'Accept': 'application/json'
                    body: JSON.stringify(data)
                });

                console.log("Sending form data: ", JSON.stringify(data))

                const responseData = await response.json();

                // 3. Handle server error response (e.g., 422 Unprocessable Entity)
                if (!response.ok) {
                    if (this.onError) {
                        this.onError(responseData, response.status);
                    }
                    return;
                }

                // 4. Successful request (200 / 201)
                if (this.onSuccess) {
                    this.onSuccess(responseData);
                }

            } catch (error) {
                console.error("Network or server error:", error);
                if (this.onError) {
                    this.onError({ message: "Network error" }, 500);
                }
            }
        });
    }

    /**
    * Generically extracts all form fields using the 'name' attribute.
    * Correctly handles multiselects and grouped checkboxes as arrays.
    */
    getData() {
        const formData = new FormData(this.form);
        const data = {};

        for (const [key, value] of formData.entries()) {
            const values = formData.getAll(key);
            data[key] = values.length > 1 ? values : value;
        }

        return data;
    }

    /**
     * Resets form fields and removes Bootstrap validation borders
     */
    reset() {
        this.form.reset();
        this.form.classList.remove("was-validated");
    }

    /**
     * Updates endpoint
     */
    setUrl(url) {
        this.url = url;
    }

    setMethod(method) {
        this.httpMethod = method;
    }

    /**
     * @param {Object} data - Backend data for the form.
     * Fills the form with backend data. Keys in the data object must match the 'name' attribute of the form inputs.
     */
    fillForm(data) {
        if (!data || typeof data !== "object") return;

        Object.entries(data).forEach(([key, value]) => {
            const field = this.form.querySelector(`[name="${key}"]`);

            if (!field) return;

            if (field.type === "checkbox") {
                field.checked = Boolean(value);
            } else if (field.type === "radio") {
                const radioOption = this.form.querySelector(`[name="${key}"][value="${value}"]`);
                if (radioOption) radioOption.checked = true;
            } else {
                field.value = value ?? ""; 
            }
        });
    }

    /**
     * Clears out all data from the form
     */
    clearForm(){
        this.reset()
    }
}