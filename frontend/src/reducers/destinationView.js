import {REMOVE_FROM_TO, SET_TO, SET_TO_SPECIAL, SET_FROM, UPDATE_FROM, UPDATE_TO, CHANGE_POSITION, UPDATE_FROM_NAME, UPDATE_TO_NAME, LOGOUT, CANCEL_REQUEST, SET_REQUEST, DECLINE_REQUEST} from "../constants/actions"


export default (state={from: '', requestReceived:false, travelMode: 'walking'}, action) => {
    switch(action.type){
        case 'SET_ACTIVE_DELIVERY_JOB':
        console.log(action);
        if(action.job[0]){
            return {
                ...state,
                from: action.job[0].fromName,
                lat: action.job[0].fromLocation[0],
                lng: action.job[0].fromLocation[1],
                clientLat: action.job[0].client.geometry.coordinates[0],
                clientLng: action.job[0].client.geometry.coordinates[1],
                requestReceived: true,
                initialSet: true,
                placeChoosen: true,
                checkSet: true,
                to: action.job[0].toName
            }
        } else {
            return {...state}
        }
        case SET_TO:
            return {
                ...state,
                to: action.data.results[0]["formatted_address"],
                initialSet: true
            };
        case SET_TO_SPECIAL:
            return {
                ...state,
                to: action.places[0].formatted_address,
                placeChoosen: true
            };
        case SET_FROM:
            return {
                ...state,
                from: action.places[0].formatted_address,
                lat: action.places[0].geometry.location.lat(),
                lng: action.places[0].geometry.location.lng()
            };
        case UPDATE_FROM:
            return {
                ...state,
                from: action.from,
                lat: action.lat,
                lng: action.lng
            };
        case UPDATE_TO:
            return {
                ...state,
                to: action.to,
                lat: action.lat,
                lng: action.lng
            };
        case CHANGE_POSITION:
            return {
                ...state,
                to: action.data.formatted_address
            }
        case UPDATE_FROM_NAME:
            return {
                ...state,
                from: action.name
            };
        case UPDATE_TO_NAME:
            return {
                ...state,
                to: action.name,
                placeChoosen: false
            };
        case LOGOUT:
            return {
                ...state,
                from: null,
                to: null
            };
        case CANCEL_REQUEST:
        console.log('canceling request', state);
            return {
                ...state,
                requestReceived: false,
                to: state.to
            };
        case 'SET_FAILURE_ACCEPTED':
            return {
                ...state,
                lat: null,
                lng: null,
                clientLat: null,
                clientLng: null,
                requestReceived: false
            }
        case 'SUCCESS_COMPLETE_DELIVERY':
            return {
                ...state,
                lat: null,
                lng: null,
                requestReceived: false
            }
        case SET_REQUEST:
            return {
                ...state,
                lat: action.data.lat,
                lng: action.data.lng,
                clientLat: action.data.clientLat,
                clientLng: action.data.clientLng,
                requestReceived: true
            };
        case 'RECEIVE_CANCEL_FROM_CLIENT':
            return {
                ...state,
                lat: null,
                lng: null,
                requestReceived: false
            };
        case DECLINE_REQUEST:
            return {
                ...state,
                lat: null,
                lng: null,
                requestReceived: false
            };
        case REMOVE_FROM_TO:
            return {
                ...state,
                lat: null,
                lng: null,
                requestReceived: false
            };
        /*case 'CHANGE_TRAVEL_MODE':
            return {
                ...state,
                travelMode: action.field
            };*/
    }
    return state;
}