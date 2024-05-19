import stylesheet from './comicsoon.css' with { type: 'css' }

class ComicSoon extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.adoptedStyleSheets = [stylesheet]
        this.render();
    }

    comicSoonCounter(count) {
        const countDownDate = new Date("2024-05-30 08:00:00").getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
              

            count.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
            if (distance < 0) {
                clearInterval(timer);
                count.innerHTML = " ::: EXPIRED :::";
            }
        }, 1000);
    }

    connectedCallback() {
        const count = this.shadowRoot.getElementById("count")
        this.comicSoonCounter(count)
    }
    render() {
        this.shadowRoot.innerHTML = `
            <div class="slide__box ">
                <div loading="lazy" class="bgimg" style="width: 100%; height: auto;">
                    <video src="https://www.datocms-assets.com/76605/1668676208-banner-handbrake.webm" preload="auto" 
                    autoplay="" loop="" playsinline="" webkit-playsinline="" x5-playsinline="" style="width: 100%; height: 
                    auto;"></video>
                </div>
                <div style="opacity: 1;" class="slide__content"><div class="slide__title">
                    <h1>COMING SOON</h1>
                    <hr>
                    <p id="count">...left</p>
                    <a href="#home">Home</a>
                </div>               
            </div>`
    }
}

customElements.define("comic-soon", ComicSoon);


