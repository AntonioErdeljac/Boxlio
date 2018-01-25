export default (state={}, action) => {
    switch(action.type){
        case 'ADD_ITEM_TO_BASKET':
            return {
                ...state,
                basket: (state.basket || []).concat([{...action.item, amount: action.amount, uniqueID: action.uniqueID}])
            }
        case 'CATALOG_PAGE_LOADED':
            return {
                ...state,
                results: action.payload.uk ? action.payload.uk.ghs.products.results : [],
            };
        case 'REMOVE_ITEM_FROM_BASKET':
            return {
                ...state,
                basket: state.basket.filter(item => item.uniqueID !== action.id),
            };
        case 'SEARCH_CATALOG_ITEMS':
            return {
                ...state,
                results: action.payload.uk ? action.payload.uk.ghs.products.results : [],
            };
        case 'REMOVE_ITEM_FROM_BASKET':
            return {
                ...state,
                basket: state.basket.filter(item => item.uniqueID !== action.id)
            };
    }
    return state;
}