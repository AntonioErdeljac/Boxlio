import {CHANGE_LOCATION, SET_REQUEST, DECLINE_REQUEST, CANCEL_REQUEST, SEND_REQUEST, REQUEST_ACCEPTED, ACCEPT_REQUEST, REDIRECT_TO_MAIN} from "../constants/actions";

export default (state={gotRequest: false,requestAccepted:false ,acceptedRequest: false, requestSent: false, 
    sentCompleteChoice: false, completeChoice: false}, action) => {
    switch(action.type){
        case 'SET_PRIVATE_REQUEST':
            return {
                ...state,
                privateRequest: true,
                toPrivateDeliveryGuy: action.deliveryGuy
            };
        case 'SET_SENT_COMPLETE_CHOICE':
        return {
            ...state,
            sentCompleteChoice: true
        }
        case 'SET_COMPLETE_CHOICE':
            return {
                ...state,
                completeChoice: true
            };
        case 'SET_ACTIVE_DELIVERY_JOB':
        if(action.job[0]){
            console.log(action.job[0])
            return {
                ...state,
                requestAccepted: true,
                gotRequest: true,
                client: action.job[0].client,
                deliveryGuy: action.job[0].deliveryGuy,
                item: action.job[0].item,
                price: action.job[0].price,
                acceptedRequest: true,
                checkSet: true,
                locationName: action.job[0].deliveryGuyLocationName
            }
        } else {
            return {...state}
        }
        case CHANGE_LOCATION:
            
            return {
                ...state,
                locationName: action.data.locationName,
                deliveryGuy: action.data.deliveryGuy
            };
        
        case SET_REQUEST:
            return {
                ...state,
                gotRequest: true,
                client: action.data.client,
                locationName: action.data.to,
                from: action.data.from,
                price: action.data.price,
                item: action.data.item
            };
        case DECLINE_REQUEST:
        console.log('micem sve na false i null');
            return {
                ...state,
                gotRequest: false,
                requestAccepted: false,
                client: null,
                gotRequest: false,
                deliveryGuy: false,
                requestSent: false,
                locationName: null,
                acceptedRequest: false,
                completeChoice: false,
                sentCompleteChoice: false
            };
        case CANCEL_REQUEST:
            return {
                ...state,
                requestAccepted: false,
                gotRequest: false,
                deliveryGuy: false,
                requestSent: false,
                acceptedRequest: false,
                completeChoice: false,
                sentCompleteChoice: false,
                privateRequest: false,
                toPrivateDeliveryGuy: false
            };
        case 'CONFIRM_COMPLETED_DELIVERY':
            return {
                ...state,
                requestAccepted: false,
                gotRequest: false,
                deliveryGuy: false,
                requestSent: false,
                acceptedRequest: false,
                completeChoice: false,
                sentCompleteChoice: false,
                privateRequest: false,
                toPrivateDeliveryGuy: false
            }
        case 'RECEIVE_CANCEL_FROM_DELIVERY_GUY':
            return {
                ...state,
                requestAccepted: false,
                gotRequest: false,
                deliveryGuy: false,
                requestSent: false,
                acceptedRequest: false,
                completeChoice: false,
                sentCompleteChoice: false,
                privateRequest: false,
                toPrivateDeliveryGuy: false
            }
        case 'RECEIVE_CANCEL_FROM_CLIENT':
            return {
                ...state,
                requestAccepted: false,
                client: null,
                gotRequest: false,
                deliveryGuy: false,
                requestSent: false,
                acceptedRequest: false,
                completeChoice: false,
                sentCompleteChoice: false
            };
        case 'SET_FAILURE_ACCEPTED':
            return {
                ...state,
                gotRequest: false,
                requestAccepted: false,
                client: null,
                gotRequest: false,
                deliveryGuy: false,
                requestSent: false,
                locationName: null,
                acceptedRequest: false,
                completeChoice: false,
                sentCompleteChoice: false
            };
        case 'SUCCESS_COMPLETE_DELIVERY':
            return {
                ...state,
                requestAccepted: false,
                client: null,
                gotRequest: false,
                deliveryGuy: false,
                requestSent: false,
                acceptedRequest: false,
                completeChoice: false,
                sentCompleteChoice: false,
                privateRequest: false,
                toPrivateDeliveryGuy: false
            };
        case SEND_REQUEST:
            return {
                ...state,
                requestSent: true
            };
        case REQUEST_ACCEPTED:
        console.log(action.data.locationName, 'DELIVERY GUY FROM REDUCER WHEN ACCEPTED');
            return {
                ...state,
                requestAccepted: true,
                deliveryGuy: action.data.deliveryGuy,
                locationName: action.data.locationName
            };
        case ACCEPT_REQUEST:
            return {
                ...state,
                acceptedRequest: true
            };
        case REDIRECT_TO_MAIN:
            return {
                ...state,
                redirectTo: null
            };
    }
    return state;
}