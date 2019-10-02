import * as Types from './../constants/ActionTypes'

let findIndexById = (products, id) => {
    let result = -1;
    products.map((product, index) => {
        if (product.id === id) {
            result = index;
        }
        return result
    })
    return result
}

let initialState = []
const products = (state = initialState, action) => {
    let index = -1
    let { id, product } = action
    switch (action.type) {
        case Types.FETCH_PRODUCTS:
            state = action.products
            return [...state]
        case Types.DELETE_PRODUCTS:
            index = findIndexById(state, id)
            state.splice(index, 1)
            return [...state]
        case Types.ADD_PRODUCTS:
            state.push(action.product)
            return [...state]
        case Types.UPDATE_PRODUCTS:
            index = findIndexById(state, product.id)
            state[index] = product
            return [...state]
        default: return [...state]
    }
}

export default products