export default (state={}, action) => {
    switch(action.type){
        case 'MESSAGES_PAGE_LOADED':
            return {
                ...state,
                clients: action.payload.clients
            };
        case 'MESSAGE_PREVIEW_PAGE_LOADED':
            return {
                ...state,
                messagePreview: action.payload.message
            }
    }
    return state;
}
