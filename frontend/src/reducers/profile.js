import * as actions from "../constants/actions";

export default (state={}, action) => {
    switch(action.type){
        case actions.PROFILE_PAGE_LOADED:
            return {
                ...state,
                profile: action.payload[0].profile,
                opinions: action.payload[1].opinions,
            };
        case actions.ADD_OPINION:
        	return {
        		...state,
        		opinions: !action.error ? ([action.payload.opinion]).concat(state.opinions || []) : (state.opinions || []),
                errors: action.error ? action.payload.errors : null
        	}
    }
    return state;
}