import {CLOSE_DROPDOWN} from "../constants/actions";

export default (state={}, action) => {
    switch(action.type){
        case CLOSE_DROPDOWN:
            return {
                ...state,
                dropDownClosed: true
            };
    }
    return state;
}