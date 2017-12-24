export default (state={}, action) => {
    switch(action.type){
        case 'MESSAGES_PAGE_LOADED':
            return {
                ...state,
                clients: action.payload.clients
            }
    }
    return state;
}
