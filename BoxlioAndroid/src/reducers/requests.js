export default (state={}, action) => {
    switch(action.type){
        case 'LOGOUT':
            return {
                ...state,
                requestSent: false,
                reanimateComponents: true
            };
        case 'CANCEL_SEND_REQUEST':
            return {
                ...state,
                requestSent: false,
                reanimateComponents: true
            };
        case 'SEND_REQUEST':
            return {
                ...state,
                requestSent: true
            };
        case 'REQUEST_ACCEPTED':
            return {
                ...state,
                requestAccepted: true,
                deliveryGuy: action.data.deliveryGuy,
                locationName: action.data.locationName
            }
    }
    return state;
}