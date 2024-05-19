import stylesheet from './style-slide-show.css' with { type: 'css' }
import '../unSplashImage/unSplashImage.js'

export class SlideShow extends HTMLElement {
    slideIndex = 1
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.adoptedStyleSheets = [stylesheet]
        this.render();

    }
    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }
    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }
    showSlides(n) {
        let slides = this.shadowRoot.querySelectorAll('div.mySlides.fade')
        let dots = this.shadowRoot.querySelectorAll('span');

        if (n > slides.length) { this.slideIndex = 1 }
        if (n < 1) { this.slideIndex = slides.length }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex - 1].style.display = "block";
        dots[this.slideIndex - 1].className += " active";
    }
    connectedCallback() {
        this.shadowRoot.querySelector("span.dot.one").onclick = () => this.currentSlide(1)
        this.shadowRoot.querySelector("span.dot.two").onclick = () => this.currentSlide(2)
        this.shadowRoot.querySelector("span.dot.three").onclick = () => this.currentSlide(3)

        this.shadowRoot.querySelector("a.prev").onclick = () => this.plusSlides(-1)
        this.shadowRoot.querySelector("a.next").onclick = () => this.plusSlides(1)

        this.currentSlide(1)
    }
    render() {
        this.shadowRoot.innerHTML = `
        <div class="slideshow-container">
            <div class="mySlides fade blur-image">
                <ardu-image></ardu-image> 
            </div>        
            <div class="mySlides fade blur-image">
                <ardu-image></ardu-image>
            </div>        
            <div class="mySlides fade blur-image">
                <ardu-image></ardu-image>
            </div>

            <a class="prev">❮</a>
            <a class="next">❯</a>

            <div class="bg-text">
                <h2 data-i18n="title"></h2>
                <p data-i18n="slide_message"></p>
            </div>  
        </div>  
       
        <br>    
        <div class="dot-container" style="text-align:center">
            <span class="dot one" ></span> 
            <span class="dot two"></span> 
            <span class="dot three" ></span> 
        </div>`
    }
}

customElements.define("slide-show", SlideShow);


