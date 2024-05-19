
/**
 * Fetch language data from json file.
 * @async
 * @method
 * @param {String} lang - language
 * @returns {Json} dataJson
 */
const fetchLanguageData = async (lang) => {
  const data = await fetch(`./src/util/languages/${lang}.json`)
  const dataJson = await data.json()
  // console.log('fetch lang data :', dataJson)
  return dataJson

}
/**
 * Set language preference of user to local storage.
 * @async
 * @method
 * @param {String} lang - language
 */
const setLanguagePreference = (lang) => {
  localStorage.setItem('language', lang)
  location.reload()
}

/**
 * Update content according to user preference
 * @async
 * @method
 * @param {Json} langData
 */
const updateContent = (langData) => {
  const mainElement = document.querySelector('main')
  //update shadow root elements
  mainElement.querySelectorAll('*').forEach(element => {
    element.shadowRoot.querySelectorAll('*').forEach(el => {
      const key = el.getAttribute('data-i18n')
      if (key != null) {
        el.textContent = langData[key]
      }
    })
  })
  // update document all elements
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n')
    element.textContent = langData[key]
  })
}

/**
 * Get language data from json file.
 * @async
 * @method
 * @returns {Json} langData
 */
const getLangData=async ()=>{
  const userPreferredLanguage = localStorage.getItem('language') || 'en'
  const langData = await fetchLanguageData(userPreferredLanguage)
  return langData
}

/**
 * Update language data
 */

const updateLang = async () => {
  updateContent(await getLangData())
}
/**
 * Update component language
 * @async
 * @method
 * @param {String} element - component root element
 */
const updateElLang = async (element) => {
  const langData = await getLangData()
  element.querySelectorAll('*').forEach(el => {
    const key = el.getAttribute('data-i18n')
    if (key != null) {
      el.textContent = langData[key]
    }
  })
}

/**
 * Get language data for mesages
 * @async
 * @method
 * @param {String} element - component root element
 * @returns {String} langData
 */
const getMesajLangData=async (key)=>{
  const langData = await getLangData()
  return langData[key]
}
/**
 * Change language preference in local storage and update content
 * @async
 * @method
 * @param {String} lang- 
 */
const changeLanguage = async (lang) => {
  await setLanguagePreference(lang)
  const langData = await fetchLanguageData(lang)
  // console.log('langData:', langData)
  updateContent(langData)
}

export { fetchLanguageData, setLanguagePreference, updateContent, 
       changeLanguage, updateLang, updateElLang,getMesajLangData}
