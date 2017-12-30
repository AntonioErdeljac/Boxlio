export default (state={showOptions: false}, action) => {
    switch(action.type){
        case 'SET_RECEIVED_REQUEST':
            return {
                ...state,
                receivedRequest: true
            };
        case 'CONFIRM_COMPLETE_DELIVERY':
            return {
                ...state,
                requestSent: false,
                deliveryGuy: null,
                locationName: null,
                requestAccepted: false,
                reanimateComponents: true,
                completeChoice: false,
            };
        case 'SET_COMPLETE_CHOICE':
            return {
                ...state,
                completeChoice: true
            };
        case 'CLOSE_OPTIONS':
            return {
                ...state,
                showOptions: false
            };
        case 'SHOW_OPTIONS':
            return {
                ...state,
                showOptions: true
            };
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
            return {};
        case 'CANCEL_ACTIVE_REQUEST':
            return {
                ...state,
                requestSent: false,
                deliveryGuy: null,
                locationName: null,
                requestAccepted: false,
                reanimateComponents: true,
                completeChoice: false
            };
        case 'RECEIVE_CANCEL_FROM_DELIVERY_GUY':
            return {
                ...state,
                requestSent: false,
                deliveryGuy: null,
                locationName: null,
                requestAccepted: false,
                reanimateComponents: true,
                completeChoice: false
            };
        case 'CANCEL_SEND_REQUEST':
            return {
                ...state,
                requestSent: false,
                reanimateComponents: true,
                requestAccepted: false,
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