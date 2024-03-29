const initialState = {currentUser: null}

export default (state=initialState, action) => {
	switch(action.type){
		case 'UPDATE_FIELD_AUTH':
			return {
				...state,
				[action.key]: action.value,
				errors: null,
				isTyping: true
			};
		case 'LOGIN':
			return {
				...state,
				errors: action.error ? action.payload.errors : null,
				isLoading: false
			};
		case 'ASYNC_START':
		if(action.subtype === 'LOGIN' || action.subtype === 'REGISTER'){
			return {
				...state,
				isLoading: true,
				isTyping: false
			}
		} else {
			return {
				...state
			}
		}
	}
	return state;
}