import "../css/app.css"
import * as bootstrap from 'bootstrap'
import { fetchHeaders } from "./fetchHeaders"

window.bootstrap = bootstrap

let inputEmail = null
let inputPassword = null
let loginBtn = null

function initDomRefs(){
    inputEmail = document.querySelector("#inputAuthEmail")
    inputPassword = document.querySelector("#inputAuthPassword")
    loginBtn = document.querySelector("#loginButton")
    loginBtn.addEventListener("click", async function(event) {
        console.log("Adding event listener login button...")
        try{
            const payload = {
                email: inputEmail.value,
                password: inputPassword.value
            }

            const response = await fetch("/auth/login", {
                method: 'POST',
                headers: fetchHeaders,
                body: JSON.stringify(payload)
            })

            const data = await response.json()

            if(response.ok){
                console.log("Authenticated")
                window.location.href = '/config'
            }else{
                window.alert(data.error)
            }
        }catch(error){
            console.error(error)
        }
    })
}

function handleLogin(){
    initDomRefs()
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Imprimir mensaje en la consola del navegador
    console.log('App loaded');
    handleLogin()
});