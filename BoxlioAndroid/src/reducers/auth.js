export default (state={}, action) => {
	switch(action.type){
		case 'UPDATE_FIELD_AUTH':
			return {
				...state,
				[action.key]: action.value,
				errors: null
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
				isLoading: true
			}
		} else {
			return {
				...state
			}
		}
	}
	return state;
}