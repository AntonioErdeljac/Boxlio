export default (state={tab: 'map'}, action) => {
	switch(action.type){
		case 'CHANGE_TAB':
			return {
				...state,
				tab: action.tab
			};
		case 'SAVE_SETTINGS':
			return {
				...state,
				tab: 'map'
			};
		case 'LOGIN':
			return {
				...state,
				tab: 'map'
			}
	}
	return state;
}