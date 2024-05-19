import stylesheet from './table.css' with { type: 'css' }
import { localFields } from '../../data/data.js'
import { getDbDataLocal } from '../../data/data.js'
import { getMesajLangData } from '../../util/languages/language.js'

let localData = ''
let headers = ''
let rows = ''
let changeAttributeField = ''

const tableHeaders = (tHeadersArr) => {
    const tHeaders = String(`
    <tr>
        <th>ID</th>
        <th>#</th>
        <th>#</th>           
        ${tHeadersArr.map(el => {
        return ('<th>' + el + '</th>')
    }).join('').replace(/\s/g, "")
        }
    </tr>`)
    return tHeaders
}

const tableData = () => {
    const tempData = [...localData]
    const tData =
        tempData.map((el, index) => {
            const objValues = Object.values(el)
            const rowData = objValues.map(value => {
                return (`<td>${value}</td>`)
            }).join('')
            return (
                `<tr>
                    <td>${index + 1}</td>
                    <td>🗑️</td>
                    <td>🖊️</td>
                    ${rowData}
                </tr>`
            )
        }).join('').replace(/\s/g, "")
    return tData
}

export class Table extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.adoptedStyleSheets = [stylesheet]
    }

    static get observedAttributes() {
        return ['headers', "data-field"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('attributeChanged:', name, newValue);
        if (name === 'headers') {
            headers = tableHeaders(newValue.split(','))
            this.render(headers, rows)
        }
        if (name === 'data-field' && newValue === localFields.users) {
            localData = getDbDataLocal(null, localFields.users)
            changeAttributeField = localFields.users
            console.log("localFields.users :", localData, changeAttributeField);
            rows = tableData()
            this.render(headers, rows)
        }
        if (name === 'data-field' && newValue === localFields.dbData) {
            localData = getDbDataLocal(null, localFields.dbData)
            changeAttributeField = localFields.dbData
            console.log("localFields.dbData:", localData, changeAttributeField);
            const itemsDataNew = localData.map(el => {
                return ({
                        title: el.title,
                        category: el.category,
                        desc: el.desc,
                        microprocessor: el.microprocessor})
            })

            localData = itemsDataNew
            rows = tableData()
            this.render(headers, rows)
        }
    }

    async updateComponentEvent() {
        const tbody = this.shadowRoot.querySelector('table');
        const msjDelete = await getMesajLangData('delete_user')
        const msjDefaultUser = await getMesajLangData('default_user_cant_delete')
        tbody.onclick = (e => {
            const cell = e.target.closest('td');
            if (!cell) { return; }
            const row = cell.parentElement;
            // console.log(row.rowIndex, cell.cellIndex);
            if (cell.cellIndex === 1) { // row delete button
                if (row.rowIndex > 1) {
                    const answer = confirm(msjDelete)
                    if (answer) {
                        localData.splice(row.rowIndex - 1, 1)

                        if (changeAttributeField === localFields.users)
                            localStorage.setItem(localFields.users, JSON.stringify(localData))
                        if (changeAttributeField === localFields.dbData)
                            localStorage.setItem(localFields.dbData, JSON.stringify(localData))

                        rows = tableData()
                        console.log(headers, rows)
                        this.render(headers, rows)
                    }
                } else alert(msjDefaultUser)
            }
            if (cell.cellIndex === 2) { // row edit button
                alert('This attribute is under construction!')
            }
        });
    }

    connectedCallback() {
        this.updateComponentEvent()
    }

    render(headers, rows) {
        this, this.shadowRoot.innerHTML = `
        <table  class="my-table">
           ${headers}
           ${rows}
        </table> `
        this.updateComponentEvent()
    }
}

customElements.define("table-striped", Table)  