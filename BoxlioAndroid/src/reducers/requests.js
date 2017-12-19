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
                requestAccepted: true,
                deliveryGuy: data.deliveryGuy,
                locationName: data.locationName
            }
    }
    return state;
}