import * as actions from "../constants/actions";

export default (state={}, action) => {
    switch(action.type){
        case actions.MESSENGER_PAGE_LOADED:
            return {
                ...state,
                profile: action.payload[0].profile,
                messages: action.payload[2].messages        
            };
        case actions.MESSENGER_PAGE_UNLOADED:
            return {};
        case actions.ADD_MESSAGE:
            return {
                ...state,
                messages: (state.messages || []).concat([action.data.message])
            };
        case actions.SET_ACTIVE_CHAT:
            return {
                ...state,
                activeChat: action.name
            }
    }
    return state;
}