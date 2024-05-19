import stylesheet from './dashboard.css' with { type: 'css' }
import usersPage from '../users/users.js'
import dataItemsPage from '../dataItems/dataItems.js'
import '../users/addUsers/addUsers.js'
import '../dataItems/addDataItems/addDataItems.js'
import { updateElLang} from '../../util/languages/language.js'

class DashBoard extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.adoptedStyleSheets = [stylesheet]
        this.render();
    }
    updateLang(){
        const mainEl=this.shadowRoot.querySelector('#dashboard')
        updateElLang(mainEl)
    }
    connectedCallback() {
        this.updateLang()
        const content=this.shadowRoot.querySelector('.content')
        const addUserBtn=this.shadowRoot.querySelector('#add-users')        
        addUserBtn.onclick=()=>{
            content.innerHTML='<add-users></add-users>'
        }
        const usersBtn=this.shadowRoot.querySelector('#users')        
        usersBtn.onclick=()=>{
            content.innerHTML=usersPage()
            this.updateLang()
        }
        const itemsBtn=this.shadowRoot.querySelector('#items')        
        itemsBtn.onclick=()=>{
            content.innerHTML=dataItemsPage()
            this.updateLang()
        }

        const adIitemsBtn=this.shadowRoot.querySelector('#add-items')        
        adIitemsBtn.onclick=()=>{
            content.innerHTML='<add-data-items></add-data-items>'
            this.updateLang()
        }
     }

    render() {
        this.shadowRoot.innerHTML = `
        <div id="dashboard">
            <div class="sidebar">
                <a class="active" href="#home" data-i18n="logout">Logout</a>
                <a id="users" data-i18n="users" >Users</a>
                <a id="add-users" data-i18n="add_user" >Add User</a>
                <a id="items" data-i18n="items">Items</a>
                <a id="add-items" data-i18n="add_item">Add Item</a>
            </div>

            <div class="content">
                ${usersPage()}
            </div>
        </div>
        `
    }
}

customElements.define("dash-board", DashBoard);


