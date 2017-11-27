export default (state={}, action) => {
	switch(action.type){
		case 'EXPLORE_PAGE_LOADED':
			return {
				...state,
				nearDeliveryUsers: action.payload.nearDeliveryUsers
			};
		case 'EXPLORE_PAGE_UNLOADED':
			return {};
	}
	return state;
}