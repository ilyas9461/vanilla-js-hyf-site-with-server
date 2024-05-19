import stylesheet from './addUsers.css' with { type: 'css' }
import "../../dashboard/dashboard.js";
import { updateElLang } from '../../../util/languages/language.js'
import { localFields } from '../../../data/data.js'
import { getDbDataLocal } from '../../../data/data.js'

let users = '' // For user data

class AddUsers extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.adoptedStyleSheets = [stylesheet]
        this.setAttribute('visible', false)
        this.render();
        users = getDbDataLocal(null, localFields.users)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render()

        const form = this.shadowRoot.querySelector('#login-form')
        form.onsubmit = (event) => {
            this.setAttribute('visible', false)
            this.onFormSubmit(event)
        }
    }
    onFormSubmit(event) {
        const data = new FormData(event.target);
        const dataForm = Object.fromEntries(data.entries());
        console.log(dataForm);
        let localData = getDbDataLocal(null, localFields.users)
        localData.push(dataForm)
        localStorage.setItem(localFields.users,JSON.stringify(localData))
        this.shadowRoot.querySelector('#form').reset()
    }

    connectedCallback() {
        const mainEl = this.shadowRoot.querySelector('.container')
        updateElLang(mainEl)
        const form = this.shadowRoot.querySelector('#form')
        console.log(form);
        form.onsubmit = (event) => {
            event.preventDefault()
            this.onFormSubmit(event)
        }
        const cancelBtn=this.shadowRoot.querySelector('.cancelbtn')
        cancelBtn.onclick=()=>{
            app.innerHTML='<dash-board></dash-board>'
        }
    } 

    render() {
        this.shadowRoot.innerHTML = `
        <div class="container">
             <h2 data-i18n="add_user"></h2>
            <form id="form">
                <div>
                    <label for="uname" data-i18n="user_name"></label>
                    <input type="text" name="uname" required>

                    <label for="psw" data-i18n="psw"></label>
                    <input type="text" name="psw" required>

                    <label for="role" data-i18n="role"></label>
                    <input type="text" name="role" required>

                    <button  data-i18n="save"></button>
                    <button type="button" class="cancelbtn" data-i18n="cancel"></button>
                </div>
            </form>
        </div> `
    }
}

customElements.define("add-users", AddUsers)