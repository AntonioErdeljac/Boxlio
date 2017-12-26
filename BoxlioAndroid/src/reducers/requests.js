export default (state={}, action) => {
    switch(action.type){
        case 'SET_ACTIVE_DELIVERY_JOB':
            return {
                ...state,
                deliveryGuy: Object.assign(action.job.deliveryGuy, action.job.deliveryGuy, {
                    ...action.job.deliveryGuy,
                    geometry: [action.job.deliveryGuy.geometry.coordinates[0], action.job.deliveryGuy.geometry.coordinates[1]]
                }),
                locationName: action.job.deliveryGuyLocationName,
                requestAccepted: true,
                requestSent: true,

            };
        case 'LOGOUT':
            return {
                ...state,
                requestSent: false,
                reanimateComponents: true
            };
        case 'RECEIVE_CANCEL_FROM_DELIVERY_GUY':
            return {
                ...state,
                requestSent: false,
                deliveryGuy: null,
                locationName: null,
                requestAccepted: false,
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
            };
        case 'CHANGE_DELIVERY_GUY_LOCATION':
            return {
                ...state,
                deliveryGuy: action.data.deliveryGuy,
                locationName: action.data.locationName
            }
    }
    return state;
}