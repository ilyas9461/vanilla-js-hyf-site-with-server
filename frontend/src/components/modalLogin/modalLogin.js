import stylesheet from './modallogin.css' with { type: 'css' }
import "../../views/dashboard/dashboard.js";
import { updateElLang, getMesajLangData } from '../../util/languages/language.js'
import { localFields } from '../../data/data.js'
import { getDbDataLocal } from '../../data/data.js'

let users = '' // for users data

class ModalLogin extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.adoptedStyleSheets = [stylesheet]
        this.setAttribute('visible', false)
        this.render();
        users = getDbDataLocal(null, localFields.users)
    }

    static get observedAttributes() {
        return ['visible'];
    }

    isUser(userData) {
        const user = users.filter(el => {
            if (el.uname === userData.uname && el.psw === userData.psw)
                return el
        })
        if (user.length > 0) return true
        else return false
    }

    async onFormSubmit (event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const dataForm = Object.fromEntries(data.entries());
        //  console.log(dataForm);
        if (this.isUser(dataForm))
            app.innerHTML = '<dash-board></dash-board>'
        else {
            const msj= await getMesajLangData('wrong_psw')
            alert(msj)
        }
            
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render()
        // console.log('change attr:', name, newValue);
        const modal = this.shadowRoot.querySelector(".modal")

        if (newValue === 'true') {
            modal.style.display = 'block'
        }
        else {
            modal.style.display = 'none'
        }

        const closeBtn = this.shadowRoot.querySelector('.close')
        closeBtn.onclick = () => {
            modal.style.display = 'none'
            this.setAttribute('visible', false)
        }

        const cancelBtn = this.shadowRoot.querySelector('.cancelbtn')
        cancelBtn.onclick = () => {
            modal.style.display = 'none'
            this.setAttribute('visible', false)
        }

        const form = this.shadowRoot.querySelector('#login-form')
        form.onsubmit = (event) => {
            this.setAttribute('visible', false)
            this.onFormSubmit(event)
        }
    }

    connectedCallback() {
        const mainEl = this.shadowRoot.querySelector('.modal')
        updateElLang(mainEl)
    }

    render() {
        this.shadowRoot.innerHTML = `
        <div class="modal">
            <form class="modal-content animate" id="login-form">
                <div class="imgcontainer">
                    <span class="close" title="Close Modal"> &times;</span>
                    <img src="https://www.arduino.cc/static/media/arduino-UNO.bcc69bde.png" alt="Avatar" class="avatar">
                </div>

                <div class="container">
                    <label for="uname" data-i18n="user_name">Username</label>
                    <input type="text" placeholder="user" name="uname" required>
                    <label for="psw" data-i18n="psw">Password</label>
                    <input type="password" placeholder="1234" name="psw" required>
                    <button type="submit" data-i18n="login"></button>
                    <button type="button" class="cancelbtn" data-i18n="cancel"></button>
                </div>
            </form>
        </div> `
    }

}

customElements.define("modal-login", ModalLogin);