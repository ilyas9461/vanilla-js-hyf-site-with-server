import stylesheet from './nav.css' with { type: 'css' }
import { getBtnCatogories, getNavCategories } from './navHelper.js';
import store from '../../lib/store/index.js'
import {localFields} from '../../data/data.js'
import { getDbDataLocal } from '../../data/data.js'

let dataConst = ''

export class TopNav extends HTMLElement {  

    constructor() { 
        super()
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.adoptedStyleSheets = [stylesheet]
        dataConst = getDbDataLocal(null,localFields.dbData)        
    }

    iconClick() {
        let icon = this.shadowRoot.getElementById('myTopnav');
        if (icon.className === "topnav") {
            icon.className += " responsive";
        } else {
            icon.className = "topnav";
        }
    }

    connectedCallback() {
        let categories = getNavCategories(getBtnCatogories(dataConst))
        // console.log("category :", categories);
        this.render(categories);

        const menuIcon = this.shadowRoot.querySelector('a.icon')
        menuIcon.onclick = () => this.iconClick()

        const allBtn = this.shadowRoot.querySelectorAll(".btn");
        store.dispatch('saveData', JSON.stringify(dataConst))

        allBtn.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const btnCategory = e.currentTarget.dataset.id;
                const menuCategoryItem = dataConst.filter((item) => {
                    if (item.category === btnCategory) {
                        return item;
                    }
                });
                if (btnCategory === "all") {
                    store.dispatch('saveData', JSON.stringify(dataConst))
                } else {
                    store.dispatch('saveData', JSON.stringify(menuCategoryItem))
                }
            });
        });

    }
    async render(categories) {
        this.shadowRoot.innerHTML = ` 
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">      
        <div class="topnav" id="myTopnav">
            <a href="javascript:void(0);" class="icon active">
                <i class="fa fa-bars"></i>
            </a>
            ${categories}                         
        </div>`
    }
}

customElements.define("nav-bar", TopNav);