export default (state={}, action) => {
	switch(action.type){
		case 'APP_LOADED':
			return {
				...state,
				appLoaded: true,
				currentUser: action.payload ? action.payload.user : null,
				token: action.token || null,
				userIsSaved: action.payload ? true : false
			};
		case 'SAVE_SETTINGS':
			return {
				...state,
				currentUser: !action.payload ? state.currentUser : action.payload.user,
				redirectTo: action.error ? null : 'welcomecurrentuser'
			};
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
			};
		case 'SET_TO_SPECIAL':
				return {
					...state,
					currentUser: Object.assign({}, {
						...state.currentUser,
						geometry: [action.place.latitude, action.place.longitude]
					})
				};
		case 'SET_POSITION':
			return {
				...state,
				currentUser: Object.assign({}, {
					...state.currentUser,
					geometry: [action.position.coords.latitude, action.position.coords.longitude]
				}),
				positionSet: true
			};
		case 'JOIN_SELF_GROUP':
			return {
				...state,
				joinedSelfGroup: true
			}
	}
	return state;
}