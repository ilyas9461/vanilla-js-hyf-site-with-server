import stylesheet from './overlaypage.css' with { type: 'css' }

class FlipCard extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.adoptedStyleSheets = [stylesheet]
        this.render()
    }

    static get observedAttributes() {
        return ['pins', 'description', 'title', 'visible'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('overlay :',name,newValue);
        if (name === 'visible') {
            
            if (newValue === "true") {
                this.shadowRoot.querySelector('.overlay').style.display = "block"
            }
        }
    }

    connectedCallback() {
        const closeBtn = this.shadowRoot.querySelector('.closebtn')
        closeBtn.onclick = () => {
            this.shadowRoot.querySelector('.overlay').style.display = "none"
        }

    }

    async render() {
        const pins = this.attributes.pins.value || ''
        const title = this.attributes.title.value || ''
        const description = this.attributes.description.value || ''

        this.shadowRoot.innerHTML = `
            <div id="overlay" class="overlay">
                <a href="javascript:void(0)" class="closebtn">&times;</a>
                <div class="overlay-content">   
                    <div class="card"> 
                         <h4><b>${title}</b></h4> 
                        <img src=${pins} alt="Avatar" style="width:100%">
                        
                    </div>    
                    <div class="container">
                            <p>${description}</p> 
                    </div>                
                </div>
            </div>`
    }
}

customElements.define("overlay-page", FlipCard);