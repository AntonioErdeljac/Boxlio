import * as actions from "../constants/actions";

export default (state={}, action) => {
    switch(action.type){
        case 'DELETE_OPINION':
            return {
                ...state,
                opinions: state.opinions.filter(opinion => opinion._id !== action.opinionLocal._id)
            }
        case actions.PROFILE_PAGE_LOADED:
            return {
                ...state,
                profile: action.payload ? action.payload[0].profile : null ,
                opinions: action.payload ? action.payload[1].opinions : null,
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