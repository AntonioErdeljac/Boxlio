import * as actions from "../constants/actions";

export default (state={clients: null}, action) => {
    switch(action.type){
        case actions.CLIENT_LIST_PAGE_LOADED:
        return {
            ...state,
            clients: action.payload.clients
        };
        case actions.CLIENT_LIST_PAGE_UNLOADED:
            return {};        
    }
    return state;
}