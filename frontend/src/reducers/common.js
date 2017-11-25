import {CANCEL_REQUEST, SUCCESS_REQUEST_ACCEPTED, REDIRECT, APP_LOADED, ACCEPT_REQUEST, REQUEST_ACCEPTED, LOGOUT, LOGIN, REGISTER, SETTINGS_SAVED, MAP_LOADED, CHANGE_POSITION, SET_POSITION, SET_TO_SPECIAL, JOIN_SELF_GROUP, DECLINE_REQUEST} from "../constants/actions";

export default (state={isLoading: true, joinedSelfGroup: false, positionSet: false}, action) => {
    switch(action.type){
        case 'CHANGE_AVAILABLE':
            return {
                ...state,
                currentUser: action.payload ? action.payload.user : state.currentUser,
                inProgress: false
            };
        case 'ASYNC_START':
        if(action.subtype === 'CHANGE_AVAILABLE'){
            return {
                ...state,
                inProgress: true
            }
        } else {
            return {
                ...state
            }
        }
        case APP_LOADED:
            return {
                ...state,
                token: action.token || null,
                currentUser: action.payload ? action.payload.user : null,
                appLoaded: true
            };
        case SUCCESS_REQUEST_ACCEPTED:
            return {
                ...state,
                redirectTo: `/messages/${action.data.client.username}`
            };
        case REQUEST_ACCEPTED:
            return {
                ...state,
                redirectTo:`/messages/${action.data.deliveryGuy.username}`
            }
        case REDIRECT:
            return {
                ...state,
                redirectTo: null
            };
        case LOGOUT:
            return {
                ...state,
                redirectTo: '/',
                currentUser: null,
                token: null,
                joinSelfGroup: false,
                positionSet: false
            };
        case SETTINGS_SAVED:
            return {
                ...state,
                currentUser: action.error ? state.currentUser : action.payload.user,
                redirectTo: action.error ? null : '/'
            };
        case LOGIN:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? null : action.payload.user,
                token: action.error ? null : action.payload.user.token
            };
        case 'RECEIVE_CANCEL_FROM_DELIVERY_GUY':
            return {
                ...state,
                redirectTo: `/messages/${action.data.deliveryGuy.username}`
            }
        case 'RECEIVE_CANCEL_FROM_CLIENT':
            return {
                ...state,
                redirectTo: `/messages/${action.data.client.username}`
            };
        case 'SUCCESS_COMPLETE_DELIVERY':
        console.log(action.data.currentUser, 'EVO RATINWS');
            return {
                ...state,
                redirectTo: `/messages/${action.data.client.username}`,
                currentUser: Object.assign(state.currentUser, state.currentUser, {
                    ...state.currentUser,
                    earnedMoney: action.data.currentUser.earnedMoney,
                    deliveredItems: action.data.currentUser.deliveredItems,
                    ratings: action.data.currentUser.ratings
                })
            }
        case REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/settings',
                currentUser: action.error ? null : action.payload.user,
                token: action.error ? null : action.payload.user.token
            };
        case MAP_LOADED:
            return {
                ...state,
                isLoading: false
            };
        case CHANGE_POSITION:
            return {
                ...state,
                currentUser: Object.assign({}, state.currentUser, {
                    geometry: [action.pos.coords.latitude, action.pos.coords.longitude]
                })
            };
        case SET_POSITION:
            return {
                ...state,
                currentUser: Object.assign(state.currentUser, state.currentUser, {
                    ...state.currentUser,
                    geometry: [action.position.coords.latitude, action.position.coords.longitude]
                }),
                positionSet: true
            };
        case SET_TO_SPECIAL:
        console.log(action, 'SPECIAL SET');
            return {
                ...state,
                currentUser: action.payload.user
            };
        case JOIN_SELF_GROUP:
            return {
                ...state,
                joinedSelfGroup: true
            };
        case 'CHANGE_TRANSPORTATION':
        console.log('transportation je ', action.field);
            return {
                ...state,
                currentUser: Object.assign({}, {}, {
                    ...state.currentUser,
                    transportation: action.field
                })
            }
    }
    return state;
}