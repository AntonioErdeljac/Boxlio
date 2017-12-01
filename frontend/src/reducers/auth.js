import * as actions from "../constants/actions";

export default (state={}, action) => {
    switch(action.type){
        case actions.UPDATE_FIELD_AUTH:
            return {
                ...state,
                [action.key]: action.value,
                errors: null
            };
        case actions.UPDATE_FIELD_LOGIN:
            return {
                ...state,
                [action.key]:action.value,
                errors: null
            };
        case actions.UPDATE_FIELD_AUTH_LOCATION:
            return {
                ...state,
                [action.key]: action.value
            };
        case actions.LOGIN:
        case actions.REGISTER:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null,
                isLoading: false
            };
        case actions.ASYNC_START:
            if(action.subtype === actions.REGISTER || action.subtype === actions.LOGIN) {
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