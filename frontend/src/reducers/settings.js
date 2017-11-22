import {SETTINGS_SAVED, ASYNC_START} from "../constants/actions";

export default (state={}, action) => {
    switch(action.type){
        case SETTINGS_SAVED:
            return {
                ...state,
                inProgress: false,
                isLoading: false,
                errors: action.error ? action.payload.errors : null
            };
        case ASYNC_START:
            return {
                inProgress: true
            }
    }
    return state;
}