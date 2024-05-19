import stylesheet from './flipcard.css' with { type: 'css' }
import '../overlayPage/overLayPage.js'

let overlayOpenHide = false

class FlipCard extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.adoptedStyleSheets = [stylesheet]
        this.render()
    }

    static get observedAttributes() {
        return ['title', 'image', 'desc', 'microprocessor', 'pins'];
    }
    updateBtnClick(){
        const overlayBtn = this.shadowRoot.querySelector(".success")
        overlayBtn.onclick = () => {
            overlayOpenHide = true
            this.render()
            overlayOpenHide = false
        }
    }
    connectedCallback() {
        this.updateBtnClick()
    }

    async render() {
        const title = this.attributes.title.value || ''
        const image = this.attributes.image.value || ''
        const microprocessor = this.attributes.microprocessor.value || ''
        const pins = this.attributes.pins.value || ''
        const desc = this.attributes.desc.value || ''

        this.shadowRoot.innerHTML = `
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">  
                    <div class="img-div">
                        <img src=${image} alt="Avatar" class="img">   
                    </div>                          
                </div>
                <div class="flip-card-back">
                    <p>${microprocessor}</p>
                    <button class="btn success">${title}</button>
                </div>
               
            </div>
        </div>
        ${overlayOpenHide ? `<overlay-page visible=${overlayOpenHide} pins=${pins} title=${title} description=${desc}></overlay-page>` : ''} `
        this.updateBtnClick()
    }
}

customElements.define("flip-card", FlipCard);


