export default (state={}, action) => {
    switch(action.type){
        case 'EXPLORE_PAGE_LOADED':
            return {
                ...state,
                clients: action.payload ? action.payload.nearDeliveryUsers : []
            };
    }
    return state;
}