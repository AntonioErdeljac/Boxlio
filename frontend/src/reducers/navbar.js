import  * as actions from "../constants/actions";

export default (state={}, action) => {
    switch(action.type){
        case actions.CLOSE_DROPDOWN:
            return {
                ...state,
                dropDownClosed: true
            };
    }
    return state;
}