export default (state={}, action) => {
    switch(action.type){
        case 'CHAT_PAGE_LOADED':
            console.log(action)
            return {
                ...state,
                messages: action.payload ? action.payload[1].messages : null,
                chat: action.payload ? action.payload[0].chat : null
            };
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: (state.messages || []).concat([action.data.message])
            }
    }
    return state;
}