import Component from '../../lib/coomponent/component.js'
import store from '../../lib/store/index.js'
import stylesheet from './contentstyle.css' with { type: 'css' }
import '../flipCard/flipCard.js'
import { putCardData} from './helperSiteContent.js';

class SiteContent extends Component {
    constructor() {
        super({
            store
        });
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.adoptedStyleSheets = [stylesheet]
    }

    connectedCallback() {
        this.render();
    }    
    render() { 
        let data=store.state.data ==='' ? '' : JSON.parse(store.state.data)
        // console.log('data content: ',(data));

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> 
        <div class="row">         
            <div class="main">
                <div class="data-row">
                    ${putCardData(data)}           
                </div>                    
            </div>           
        </div> 
        <div class"row">
            <div class="footer center">
                <div style="padding:10px">
                    <a href="https://github.com/ilyas9461" target="_blank" class="fa fa-github"></a>
                    <a href="https://www.linkedin.com/in/ilyas-yagcioglu" target="_blank" class="fa fa-linkedin"></a>
                    <a href="https://www.youtube.com/@ilyas-wi3ug" target="_blank" class="fa fa-youtube"></a>
                </div>
                <div class="" >
                    <p>Copyright © 2024 My Website</p>
                </div>           
            </div>
         </div>        
        `        
    }
}

customElements.define("site-content", SiteContent);
