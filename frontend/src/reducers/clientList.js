import {CLIENT_LIST_PAGE_UNLOADED, CLIENT_LIST_PAGE_LOADED} from "../constants/actions";

export default (state={clients: null}, action) => {
    switch(action.type){
        case CLIENT_LIST_PAGE_LOADED:
        return {
            ...state,
            clients: action.payload.clients
        };
        case CLIENT_LIST_PAGE_UNLOADED:
            return {};        
    }
    return state;
}