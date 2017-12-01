import * as actions from "../constants/actions";


export default (state={gotRequest: false,requestAccepted:false ,acceptedRequest: false, requestSent: false, 
    sentCompleteChoice: false, completeChoice: false}, action) => {
    switch(action.type){
        case actions.SET_PRIVATE_REQUEST:
            return {
                ...state,
                privateRequest: true,
                toPrivateDeliveryGuy: action.deliveryGuy
            };
        case actions.SET_SENT_COMPLETE_CHOICE:
        return {
            ...state,
            sentCompleteChoice: true
        };
        case actions.SET_COMPLETE_CHOICE:
            return {
                ...state,
                completeChoice: true
            };
        case actions.SET_ACTIVE_DELIVERY_JOB:
        if(action.job){
            return {
                ...state,
                requestAccepted: true,
                gotRequest: true,
                client: action.job.client,
                deliveryGuy: action.job.deliveryGuy,
                item: action.job.item,
                price: action.job.price,
                acceptedRequest: true,
                checkSet: true,
                locationName: action.job.deliveryGuyLocationName
            }
        } else {
            return {...state}
        }
        case actions.CHANGE_LOCATION:
            
            return {
                ...state,
                locationName: action.data.locationName,
                deliveryGuy: action.data.deliveryGuy
            };
        
        case actions.SET_REQUEST:
            return {
                ...state,
                gotRequest: true,
                client: action.data.client,
                locationName: action.data.to,
                from: action.data.from,
                price: action.data.price,
                item: action.data.item
            };
        case actions.DECLINE_REQUEST:
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
        case actions.CANCEL_REQUEST:
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
        case actions.CONFIRM_COMPLETED_DELIVERY:
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
        case actions.RECEIVE_CANCEL_FROM_DELIVERY_GUY:
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
        case actions.RECEIVE_CANCEL_FROM_CLIENT:
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
        case actions.SET_FAILURE_ACCEPTED:
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
        case actions.SUCCESS_COMPLETE_DELIVERY:
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
        case actions.SEND_REQUEST:
            return {
                ...state,
                requestSent: true
            };
        case actions.REQUEST_ACCEPTED:
            return {
                ...state,
                requestAccepted: true,
                deliveryGuy: action.data.deliveryGuy,
                locationName: action.data.locationName
            };
        case actions.ACCEPT_REQUEST:
            return {
                ...state,
                acceptedRequest: true
            };
        case actions.REDIRECT_TO_MAIN:
            return {
                ...state,
                redirectTo: null
            };
    }
    return state;
}