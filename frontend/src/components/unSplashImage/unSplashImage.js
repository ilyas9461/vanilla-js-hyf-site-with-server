import stylesheet from './unsplahimage.css' with { type: 'css' }

class UnsplashImage extends HTMLElement {
    constructor() {
        super()
        const shadowRoot= this.attachShadow({ mode: 'open' })
        shadowRoot.adoptedStyleSheets = [stylesheet]

    }
    getImg() {
        fetch('https://source.unsplash.com/random/1000x400/?arduino')
            .then(data => { 
                this.shadowRoot.innerHTML = `
                <div class="center">
                    <img src="${data.url}" style="width:100%"> 
                </div>
                `
            })
            .catch(error => console.error(error));
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = `
                <div class="center" style="width:30%">
                    <img src="https://store.arduino.cc/cdn/shop/files/ABX00042_00.iso_1000x750.jpg?v=1727964313"
                     style="width:100%"> 
                </div>
                ` 
        // this.getImg()
    }
}

customElements.define("ardu-image", UnsplashImage);