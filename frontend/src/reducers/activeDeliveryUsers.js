import * as actions from "../constants/actions";

export default (state={}, action) => {
    switch(action.type){
        case actions.ACTIVE_DELIVERY_USERS_LOADED:
            return {
                ...state,
                profiles: action.payload.profiles
            };
    }
    return state;
}