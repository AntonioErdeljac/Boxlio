export default (state={}, action) => {
	switch(action.type){
		case 'APP_LOADED':
			return {
				...state,
				appLoaded: true,
				currentUser: action.payload ? action.payload.user : null,
				token: action.token || null,
				userIsSaved: action.payload ? true : false
			}
		case 'SAVE_SETTINGS':
			return {
				...state,
				currentUser: !action.payload ? state.currentUser : action.payload.user,
				redirectTo: action.error ? null : 'welcomecurrentuser'
			}
		case 'LOGOUT':
			return {
				...state,
				currentUser: null,
				token: null,
				userIsSaved: false,
				redirectTo: 'home'
			};
		case 'LOGIN':
			return {
				...state,
				currentUser: action.payload ? action.payload.user : null
			};
		case 'REDIRECT':
			return {
				...state,
				redirectTo: null
			}
	}
	return state;
}