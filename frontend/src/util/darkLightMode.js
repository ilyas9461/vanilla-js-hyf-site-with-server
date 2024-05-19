/**
 * Set dark mode preference
 * @async
 * @method
 * @param {String} darkLigh 
 */
const setDarkModePreference= (darkLight)=> {
    localStorage.setItem('darkmode', darkLight)
    location.reload()
}
/**
 * Get dark mode preference from local storage.
 * @async
 * @method
 * @returns {String} 
 */
const getDarkModePreference = () => {
    return localStorage.getItem('darkmode') || 'DARK'
}
/**
 * Update dark mode prefrence on the document
 * @async
 * @method
 * @param {String} darkLight
 */
const updateDarkLightMode = (darkLight) => {
    if(darkLight==='DARK'){
        document.documentElement.classList.remove('light-mode');
    }else{
        document.documentElement.classList.add('light-mode');
    }
}

export{setDarkModePreference, getDarkModePreference, updateDarkLightMode }