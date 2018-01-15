export default (state={}, action) => {
    switch(action.type) {
        case 'CATALOG_PAGE_LOADED':
            return {
                ...state,
                results: action.payload.uk.ghs.products.results
            };
    }
    return state;
}