export default (state={}, action) => {
    switch(action.type){
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
            }
    }
    return state;
}