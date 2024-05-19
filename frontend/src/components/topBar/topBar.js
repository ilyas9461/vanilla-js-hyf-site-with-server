import stylesheet from './topbar.css' with { type: 'css' }
import { changeLanguage } from '../../util/languages/language.js'
import { setDarkModePreference, getDarkModePreference, updateDarkLightMode } from '../../util/darkLightMode.js'
import '../modalLogin/modalLogin.js'
import { updateLang } from '../../util/languages/language.js'
import '../../views/comicSoon/comicSoon.js'

let modalVisible = false
let langBtnText = ''
let darkBtnText = ''

export class TopBar extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.adoptedStyleSheets = [stylesheet]
        this.render();
    }

    connectedCallback() {
        const topNav = this.shadowRoot.querySelector('.topnav')

        document.addEventListener("scroll", (e) => {
            const sticky = topNav.offsetTop + 5;
            // console.log('Scroll:', window.scrollY, sticky);
            if (window.scrollY >= sticky) {
                topNav.classList.add("sticky")
            } else {
                topNav.classList.remove("sticky");
            }
        }, false);

    }
    updateBtns() {
        const langBtn = this.shadowRoot.getElementById('lang-btn')
        const userPreferredLanguage = localStorage.getItem('language') || 'en'
        if (userPreferredLanguage === 'en') {
            langBtnText = '🌐-NL'
            langBtn.textContent = langBtnText
        }
        else {
            langBtnText = '🌐-EN'
            langBtn.textContent = langBtnText
        }
        langBtn.onclick = () => {
            if (userPreferredLanguage === 'en') changeLanguage('nl')
            else changeLanguage('en')
        }

        const darkMode = getDarkModePreference()
        const darkBtn = this.shadowRoot.getElementById('dark-btn')
        if (darkMode === 'DARK') {
            darkBtnText = darkBtn.textContent = '💡'
            updateDarkLightMode(darkMode)
        }
        else {
            darkBtnText = darkBtn.textContent = '🌙'
            updateDarkLightMode(darkMode)
        }

        darkBtn.onclick = () => {
            if (darkMode === 'DARK') {
                setDarkModePreference('LIGHT')
            } else {
                setDarkModePreference('DARK')
            }
        }
        const loginBtn = this.shadowRoot.getElementById('login-btn')
        loginBtn.onclick = () => {
            modalVisible = true
            this.render()
            modalVisible = false

        }

        const eduBtn = this.shadowRoot.getElementById('edu-btn')
        eduBtn.onclick = () => {
            app.innerHTML = '<comic-soon><comic-soon/>'
        }
        const designBtn = this.shadowRoot.getElementById('design-btn')
        designBtn.onclick = () => {
            app.innerHTML = '<comic-soon><comic-soon/>'
        }
    }
    render() {
        this.shadowRoot.innerHTML = `
    <div class="topnav">
        <a class="active logo-ardu" href="#home" >
            <svg xmlns="http://www.w3.org/2000/svg"  class="logo-ardu-img">
            <image href="https://cdn.arduino.cc/header-footer/prod/assets/headerLogo-arduino.svg" class="logo-ardu-img"/>
            </svg>
        </a>
        <a class="pointer" id="edu-btn" data-i18n="education">Edu</a>
        <a class="pointer" id="design-btn" data-i18n="design">Design</a>
        <a class="split pointer" id="login-btn" data-i18n="login">Login</a>
        <a class="split pointer" id="lang-btn" >${langBtnText}</a>
        <a class="split pointer" id="dark-btn">${darkBtnText}</a>
    </div>
    <modal-login visible=${modalVisible}></modal-login>`

        this.updateBtns()
        updateLang()
    }
}

customElements.define("top-bar", TopBar);