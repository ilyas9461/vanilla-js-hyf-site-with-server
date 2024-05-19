import home from "./views/home.js";
import {fetchLanguageData, updateContent} from './util/languages/language.js'
import { dataConst } from "./data/data.js"
import { getDbDataLocal } from "./data/data.js";
import {localFields} from './data/data.js'

getDbDataLocal(dataConst,localFields.dbData)
getDbDataLocal([
    {uname:'user', psw:'1234', role:'Manager'},
], 
localFields.users)

const routes = {
    "/": { title: "Home", render: home }
};

const  router=()=> {
    let view = routes[location.pathname];
    
    if (view) {
        document.title = view.title;
        app.innerHTML = view.render();
    } else {
        history.replaceState("", "", "/");
        router();
    }
};

// Handle navigation
window.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        history.pushState("", "", e.target.href);
        router();
    }
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener('DOMContentLoaded', async () => {
    router()
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    // console.log('aap lang data:',langData);
    updateContent(langData);   
  });



