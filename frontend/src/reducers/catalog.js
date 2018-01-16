export default (state={}, action) => {
    switch(action.type) {
        case 'ADD_ITEM_TO_BASKET':
        console.log(state.basket);
            return {
                ...state,
                basket: (state.basket || []).concat([action.item])
            }
        case 'CATALOG_PAGE_LOADED':
            return {
                ...state,
                results: action.payload.uk ? action.payload.uk.ghs.products.results : [],
            };
        case 'SEARCH_CATALOG_ITEMS':
        console.log(action);
            return {
                ...state,
                results: action.payload.uk ? action.payload.uk.ghs.products.results : [],
            };
    }
    return state;
}