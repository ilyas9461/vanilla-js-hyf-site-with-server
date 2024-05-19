import '../../components/table/table.js'
import { localFields } from '../../data/data.js'

const dataItems=  () => {  
    return (
        `<div id="items">
            <h2 data-i18n="items"></h2>
            <table-striped data-field="${localFields.dbData }" headers="Title, Category, Desc, Microprocessor"></table-striped>
        </div>`)
}

export default dataItems