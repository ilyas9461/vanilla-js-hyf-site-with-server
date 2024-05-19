/**
 * It brings the categories from the content data to the dynamic menu.
 * @async
 * @method
 * @param {Array Json} data
 * @returns {Array} Categories
 */

const getBtnCatogories = (data) => {
    const categories = data.reduce((values, items) => {
        if (!values.includes(items.category)) {
            values.push(items.category);
        }
        return values;
    },
        ["all"],
    );
    return categories
}

/**
 * Converting categories to dynamic menu buttons.
 * @async
 * @method
 * @param {Array} categories
 * @returns {Array} butons
 */

const getNavCategories = (categories) => {
    const clone = [...categories]
    const allBtn = clone.map((category) => {
        return `
            <a  class="pointer btn" data-i18n="${category}" data-id=${category}>${category}</a> 
        `;
    }).join("");
    return allBtn
}

export { getBtnCatogories, getNavCategories}
