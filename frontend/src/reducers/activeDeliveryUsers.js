import {ACTIVE_DELIVERY_USERS_LOADED} from "../constants/actions";

export default (state={}, action) => {
    switch(action.type){
        case ACTIVE_DELIVERY_USERS_LOADED:
            return {
                ...state,
                profiles: action.payload.profiles
            };
    }
    return state;
}