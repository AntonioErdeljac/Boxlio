import {SET_CLIENT_COUNT} from "../constants/actions";

export default (state={}, action) => {
    switch(action.type){
        case SET_CLIENT_COUNT:
            return {
                ...state,
                clientCount: action.data.clientCount
            };
    }
    return state;
}