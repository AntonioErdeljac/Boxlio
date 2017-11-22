import {UPDATE_FIELD_AUTH, UPDATE_FIELD_LOGIN, UPDATE_FIELD_AUTH_LOCATION, LOGIN, REGISTER, ASYNC_START} from "../constants/actions"

export default (state={}, action) => {
    switch(action.type){
        case UPDATE_FIELD_AUTH:
            return {
                ...state,
                [action.key]: action.value,
                errors: null
            };
        case UPDATE_FIELD_LOGIN:
            return {
                ...state,
                [action.key]:action.value,
                errors: null
            };
        case UPDATE_FIELD_AUTH_LOCATION:
            return {
                ...state,
                [action.key]: action.value
            };
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null,
                isLoading: false
            };
        case ASYNC_START:
            if(action.subtype === REGISTER || action.subtype === LOGIN) {
                return {
                    ...state,
                    inProgress: true,
                    isLoading: true
                };

            } else {
                return state;
            }

    }
    return state;
}