import * as actions from "../constants/actions";

const initialState = {
    isLoading: true,
    joinedSelfGroup: false,
    positionSet: false
};

export default (state=initialState, action) => {
    switch(action.type){
        case 'ALERT_MESSAGE':
            return {
                ...state,
                currentUser: Object.assign({}, {}, {
                    ...state.currentUser,
                    alertMessage: true
                })
            }
        case 'REMOVE_ALERT_MESSAGE':
            return {
                ...state,
                currentUser: Object.assign({}, {}, {
                    ...state.currentUser,
                    alertMessage: false
                })
            }
        case actions.MESSENGER_PAGE_LOADED:
            return {
                ...state,
                redirectTo: action.payload ? null : '/notfound'
            }
        case actions.PROFILE_PAGE_LOADED:
            return {
                ...state,
                redirectTo: action.payload ? null : '/notfound'
            }
        case actions.SET_PRIVATE_REQUEST:
            return {
                ...state,
                redirectTo: '/'
            };
        case actions.CHANGE_AVAILABLE:
            return {
                ...state,
                currentUser: action.payload ? action.payload.user : state.currentUser,
                inProgress: false
            };
        case actions.ASYNC_START:
        if(action.subtype === actions.CHANGE_AVAILABLE){
            return {
                ...state,
                inProgress: true
            }
        } else {
            return {
                ...state
            }
        }
        case actions.APP_LOADED:
            return {
                ...state,
                token: action.token || null,
                currentUser: action.payload ? action.payload.user : null,
                appLoaded: true
            };
        case actions.SUCCESS_REQUEST_ACCEPTED:
            return {
                ...state,
                redirectTo: `/messages/${action.data.client.username}`
            };
        case actions.REQUEST_ACCEPTED:
            return {
                ...state,
                redirectTo:`/messages/${action.data.deliveryGuy.username}`
            }
        case actions.REDIRECT:
            return {
                ...state,
                redirectTo: null
            };
        case actions.LOGOUT:
            return {
                ...state,
                redirectTo: '/',
                currentUser: null,
                token: null,
                joinSelfGroup: false,
                positionSet: false
            };
        case 'SAVE_IMAGE':
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    image: action.payload.user.image
                }
            }
        case actions.SETTINGS_SAVED:
            return {
                ...state,
                currentUser: action.error ? state.currentUser : action.payload.user,
                redirectTo: action.error ? null : '/'
            };
        case actions.ADD_CLIENT:
            return {
                ...state,
                redirectTo: action.error ? `/messages` : `/messages/${action.payload.profile.username}`
            };
        case actions.UPDATE_CURRENT_USER:
            return {
                ...state,
                currentUser: action.data.currentUser
            }
        case actions.LOGIN:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? null : action.payload.user,
                token: action.error ? null : action.payload.user.token
            };
        case actions.RECEIVE_CANCEL_FROM_DELIVERY_GUY:
            return {
                ...state,
                redirectTo: `/messages/${action.data.deliveryGuy.username}`
            }
        case actions.RECEIVE_CANCEL_FROM_CLIENT:
            return {
                ...state,
                redirectTo: `/messages/${action.data.client.username}`
            };
        case actions.SUCCESS_COMPLETE_DELIVERY:
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
        case actions.REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/settings',
                currentUser: action.error ? null : action.payload.user,
                token: action.error ? null : action.payload.user.token
            };
        case actions.MAP_LOADED:
            return {
                ...state,
                isLoading: false
            };
        case actions.CHANGE_POSITION:
            return {
                ...state,
                currentUser: Object.assign({}, state.currentUser, {
                    geometry: [action.pos.coords.latitude, action.pos.coords.longitude]
                })
            };
        case actions.SET_POSITION:
            return {
                ...state,
                currentUser: Object.assign(state.currentUser, state.currentUser, {
                    ...state.currentUser,
                    geometry: [action.position.coords.latitude, action.position.coords.longitude]
                }),
                positionSet: true
            };
        case actions.SET_TO_SPECIAL:
            return {
                ...state,
                currentUser: action.payload.user
            };
        case actions.JOIN_SELF_GROUP:
            return {
                ...state,
                joinedSelfGroup: true
            };
        case actions.CHANGE_TRANSPORTATION:
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