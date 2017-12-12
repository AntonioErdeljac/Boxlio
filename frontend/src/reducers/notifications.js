export default (state={alertMessage: false}, action) => {
	switch(action.type){
		case 'ALERT_MESSAGE':
			return {
				...state,
				alertMessage: true
			};
			case 'REMOVE_ALERT_MESSAGE':
				return {
					...state,
					alertMessage: false
				}
	}
	return state;
}