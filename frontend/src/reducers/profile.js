export default (state={}, action) => {
    switch(action.type){
        case 'PROFILE_PAGE_LOADED':
            return {
                ...state,
                profile: action.payload[0].profile,
                opinions: action.payload[1].opinions
            };
        case 'ADD_OPINION':
        	return {
        		...state,
        		opinions: ([action.payload.opinion]).concat(state.opinions || [])
        	}
    }
    return state;
}