import { updateLang } from '../util/languages/language.js'

import '../components/slideShow/slideShow.js'
import '../components/topBar/topBar.js'
import '../components/nav/nav.js'
import '../components/content/siteContent.js'

const home =  () => {  
    updateLang()
    return (
        `<top-bar></top-bar>
        <slide-show></slide-show>
        <nav-bar></nav-bar>
        <site-content></site-content>
    `)
}

export default home
