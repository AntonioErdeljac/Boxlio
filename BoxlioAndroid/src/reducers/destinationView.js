export default (state={placeToChoosen: true, transportation:null}, action) => {
	switch(action.type){
		case "RECEIVE_CANCEL_FROM_DELIVERY_GUY":
			return {
				...state,
				placeFromChoosen: false,
				from: null,
				lat: null,
				lng: null,
				closeFromInput: false,
				requestCanceled: true
			};
		case 'SET_ACTIVE_DELIVERY_JOB':
            return {
                ...state,
				placeToChoosen: true,
				placeFromChoosen: true,
				from: action.job.fromName,
				to: action.job.toName,
				lat: action.job.fromLocation[0],
				lng: action.job.fromLocation[1],
                checkSet: true,
				closeFromInput: true,
				closeToInput: true
            };
		case 'SHOW_TO_INPUT':
			return {
				...state,
				placeToChoosen: false,
				closeToInput: false
			};
        case 'SHOW_FROM_INPUT':
            return {
                ...state,
                placeFromChoosen: false,
                closeFromInput: false
            };
		case 'SET_ITEM':
			return {
				...state,
				item: action.text
			};
		case 'SET_PROFIT':
			return {
				...state,
				price: action.amount
			};
		case 'CHANGE_TRAVEL_MODE':
				return {
					...state,
					transportation: action.field
				};
		case 'SET_TO':
			return {
				...state,
				to: action.data.results[0]["formatted_address"],
				initialSet: true,
				placeChoosen: true,
				closeToInput: true
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
				placeFromChoosen: true,
				closeFromInput: true
			};
		case 'SET_TO_SPECIAL':
			return {
				...state,
                to: action.place.address,
                placeToChoosen: true,
				hasTyped: true,
				closeToInput: true
			};
		case 'SET_DIRECTIONS':
				return {
					...state,
					directions: action.direction
				};
		case 'SET_TO_NAME':
				return {
					...state,
					to: action.text,
					placeToChoosen: false
				};
		case 'LOGOUT':
				return {
					...state,
                    placeToChoosen: true,
					to: null,
					from: null,
					initialSet: false,
					placeChoosen: false,
					placeFromChoosen: false,
					hasTyped: false,
					lat: null,
					lng: null,
					directions: null,
					closeFromInput: false,
					closeToInput: false
				}
	}
	return state;
}