import '../../components/table/table.js'
import { localFields } from '../../data/data.js'
const users =  () => {  
    return (
        `<div id="users">
            <h2 data-i18n="users"></h2>
            <table-striped data-field="${localFields.users }" headers="User Name, Password, Role"></table-striped>
        </div>`)
}

export default users