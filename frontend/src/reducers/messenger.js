import {MESSENGER_PAGE_LOADED, MESSENGER_PAGE_UNLOADED, SET_ACTIVE_CHAT, ADD_MESSAGE} from "../constants/actions";

export default (state={}, action) => {
    switch(action.type){
        case MESSENGER_PAGE_LOADED:
            return {
                ...state,
                profile: action.payload[0].profile,
                messages: action.payload[2].messages        
            };
        case MESSENGER_PAGE_UNLOADED:
            return {};
        case ADD_MESSAGE:
            console.log(action, 'ACTION');
            return {
                ...state,
                messages: (state.messages || []).concat([action.data.message])
            };
        case SET_ACTIVE_CHAT:
        console.log('postavljam trenutni chat', action);
            return {
                ...state,
                activeChat: action.name
            }
    }
    return state;
}