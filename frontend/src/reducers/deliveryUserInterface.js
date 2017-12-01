import * as actions from "../constants/actions";

export default (state={}, action) => {
    switch(action.type){
        case actions.SET_CLIENT_COUNT:
            return {
                ...state,
                clientCount: action.data.clientCount
            };
    }
    return state;
}