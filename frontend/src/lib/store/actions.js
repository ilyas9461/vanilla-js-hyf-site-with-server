export default {
    addItem(context, payload) // object key and value is a function
    {
        context.commit('addItem', payload)
    },
    clearItem(context, payload) 
    {
        context.commit('clearItem', payload)
    },
    saveData(context,payload){
        context.commit('saveData', payload)
    }
};
