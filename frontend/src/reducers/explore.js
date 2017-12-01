import * as constants from "../constants/actions";

export default (state={}, action) => {
	switch(action.type){
		case constants.EXPLORE_PAGE_LOADED:
			return {
				...state,
				nearDeliveryUsers: action.payload.nearDeliveryUsers
			};
		case constants.EXPLORE_PAGE_UNLOADED:
			return {};
	}
	return state;
}