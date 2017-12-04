export default (state={}, action) => {
	switch(action.type){
		case 'LOGIN':
			return {
				...state,
				currentUser: action.payload ? action.payload.user : null
			}
	}
	return state;
}