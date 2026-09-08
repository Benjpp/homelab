import { fetchHeaders } from "../fetchHeaders"

export class Select{
    constructor(domItem, dataUrl){
        this.domItem = domItem
        this.dataUrl = dataUrl
    }

    setUrl(newUrl){
        this.dataUrl = newUrl
    }

    /**
     * Initializes select options to options retrieved by the dataUrl. 
     * Expected format is an array of two pairs of keys "id" and "name".
     */
    async init(){
        try{
            const response = await fetch(this.dataUrl, {
                headers: fetchHeaders,
                method: "GET"
            })

            if(!response.ok){
                // TODO Toast like alert
                console.warn("Select.init(): error in fetch response")
                return
            }

            const json = await response.json()
            this.domItem.innerHTML = ""
            json.forEach(element => {
                const option = document.createElement('option')
                option.value = element.id
                option.textContent = element.name
                this.domItem.appendChild(option)
            });
        }catch(error){
            // TODO Toast like alert
            console.error(error)
        }
    }
}