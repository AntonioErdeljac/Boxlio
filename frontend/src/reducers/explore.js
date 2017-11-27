export default (state={}, action) => {
	switch(action.type){
		case 'EXPLORE_PAGE_LOADED':
		console.log(action.payload, 'OVDJE JE REULTAT');
			return {
				...state,
				nearDeliveryUsers: action.payload.nearDeliveryUsers
			}
	}
	return state;
}