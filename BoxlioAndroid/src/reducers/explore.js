export default (state={}, action) => {
    switch(action.type){
        case 'EXPLORE_PAGE_LOADED':
            return {
                ...state,
                clients: action.payload ? action.payload.nearDeliveryUsers : []
            };
        case 'ADD_FRIEND':
            return {
                ...state,
              sendRedirect: action.payload.profile ? true : null
            };
        case 'RESET_REDIRECT':
            return {
                ...state,
                sendRedirect: null
            }
    }
    return state;
}