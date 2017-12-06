export default (state={}, action) => {
	switch(action.type){
		case 'SET_TO':
			return {
				...state,
				to: action.data.results[0]["formatted_address"],
				initialSet: true,
				placeChoosen: true
			};
		case 'SET_FROM':
			return {
				...state,
				from: action.text
			}
	}
	return state;
}