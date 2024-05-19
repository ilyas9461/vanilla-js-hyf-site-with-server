import '../flipCard/flipCard.js'

/**
 * Prepare Flip Card fot the content
 * @async
 * @method
 * @param {Array Json} data - content data
 * @returns {Array} User object
 */

const putCardData=(data)=>{
    
    return data.map(el=>{
        return `
        <div class="data-column">
            <flip-card 
                title=${el.title} image=${el.img} microprocessor=${el.microprocessor} pins=${(el.pins)} desc=${el.desc}
            >
            </flip-card>
        </div>  
    `}).join("")
}

export {putCardData }