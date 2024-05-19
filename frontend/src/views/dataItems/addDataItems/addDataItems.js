import stylesheet from './addDataItems.css' with { type: 'css' }
import "../../dashboard/dashboard.js";
import { updateElLang } from '../../../util/languages/language.js'
import { localFields } from '../../../data/data.js'
import { getDbDataLocal } from '../../../data/data.js'

class AddDataItems extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.adoptedStyleSheets = [stylesheet]
        this.setAttribute('visible', false)
        this.render();
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
        let localData = getDbDataLocal(null, localFields.dbData)
        dataForm.id=localData.length
        console.log(dataForm);
        localData.push(dataForm)
        localStorage.setItem(localFields.dbData,JSON.stringify(localData))
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
                    <label for="title" data-i18n="title_label"></label>
                    <input type="text" name="title" required>

                    <label for="category" data-i18n="category"></label>
                    <input type="text" name="category" required>

                    <label for="img" data-i18n="img_link"></label>
                    <input type="text" name="img" required>

                    <label for="pins" data-i18n="pins_link"></label>
                    <input type="text" name="pins" required>

                    <label for="microprocessor" data-i18n="microprocessor"></label>
                    <input type="text" name="microprocessor" required>

                    <label for="desc" data-i18n="desc"></label>
                    <input type="text" name="desc" required>

                    <button  data-i18n="save"></button>
                    <button type="button" class="cancelbtn" data-i18n="cancel"></button>
                </div>
            </form>
        </div> `
    }
}

customElements.define("add-data-items", AddDataItems)