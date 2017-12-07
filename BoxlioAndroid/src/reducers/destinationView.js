export default (state={}, action) => {
	switch(action.type){
		case 'SET_TO':
			return {
				...state,
				to: action.data.results[0]["formatted_address"],
				initialSet: true,
				placeChoosen: true
			};
		case 'SET_FROM_NAME':
			return {
				...state,
				from: action.text,
                placeFromChoosen: false
			};
		case 'SET_FROM':
			return {
				...state,
				from: action.place.address,
				lat: action.place.latitude,
				lng: action.place.longitude,
				placeFromChoosen: true
			};
		case 'SET_DIRECTIONS':
				return {
					...state,
					directions: action.direction
				}
	}
	return state;
}