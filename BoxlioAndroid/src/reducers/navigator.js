export default (state={tab: 'main'}, action) => {
	switch(action.type){
		case 'CHANGE_TAB':
			return {
				...state,
				tab: action.tab
			};
	}
	return state;
}