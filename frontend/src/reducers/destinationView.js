import * as actions from "../constants/actions";

const initialState = {
    from: '', 
    requestReceived:false, 
    travelMode: 'walking'
};

export default (state=initialState, action) => {
    switch(action.type){
        
        case actions.SET_ACTIVE_DELIVERY_JOB:
            if(action.job){
                return {
                    ...state,
                    from: action.job.fromName,
                    lat: action.job.fromLocation[0],
                    lng: action.job.fromLocation[1],
                    clientLat: action.job.client.geometry.coordinates[0],
                    clientLng: action.job.client.geometry.coordinates[1],
                    requestReceived: true,
                    initialSet: true,
                    placeChoosen: true,
                    placeChoosenFrom: true,
                    checkSet: true,
                    to: action.job.toName
                }
            } else {
                return {...state}
            }
        case actions.SET_TO:
            return {
                ...state,
                to: action.data.results[0]["formatted_address"],
                initialSet: true,
                placeChoosen: true
            };
        case actions.SET_TO_SPECIAL:
            return {
                ...state,
                to: action.places[0].formatted_address,
                placeChoosen: true
            };
        case actions.SET_FROM:
            return {
                ...state,
                from: action.places[0].formatted_address,
                lat: action.places[0].geometry.location.lat(),
                lng: action.places[0].geometry.location.lng(),
                placeChoosenFrom: true
            };
        case actions.UPDATE_FROM:
            return {
                ...state,
                from: action.from,
                lat: action.lat,
                lng: action.lng,
                placeChoosenFrom: true
            };
        case actions.UPDATE_TO:
            return {
                ...state,
                to: action.to,
                lat: action.lat,
                lng: action.lng
            };
        case actions.CHANGE_POSITION:
            return {
                ...state,
                to: action.data.formatted_address
            }
        case actions.UPDATE_FROM_NAME:
            return {
                ...state,
                from: action.name,
                placeChoosenFrom: false
            };
        case actions.UPDATE_TO_NAME:
            return {
                ...state,
                to: action.name,
                placeChoosen: false
            };
        case actions.LOGOUT:
            return {
                ...state,
                from: null,
                to: null
            };
        case actions.CANCEL_REQUEST:
            return {
                ...state,
                requestReceived: false,
                to: state.to
            };
        case actions.SET_FAILURE_ACCEPTED:
            return {
                ...state,
                lat: null,
                lng: null,
                clientLat: null,
                clientLng: null,
                requestReceived: false
            }
        case actions.SUCCESS_COMPLETE_DELIVERY:
            return {
                ...state,
                lat: null,
                lng: null,
                requestReceived: false
            }
        case actions.SET_REQUEST:
            return {
                ...state,
                lat: action.data.lat,
                lng: action.data.lng,
                clientLat: action.data.clientLat,
                clientLng: action.data.clientLng,
                requestReceived: true
            };
        case actions.RECEIVE_CANCEL_FROM_CLIENT:
            return {
                ...state,
                lat: null,
                lng: null,
                requestReceived: false
            };
        case actions.DECLINE_REQUEST:
            return {
                ...state,
                lat: null,
                lng: null,
                requestReceived: false
            };
        case actions.REMOVE_FROM_TO:
            return {
                ...state,
                lat: null,
                lng: null,
                requestReceived: false
            };
    }
    return state;
}