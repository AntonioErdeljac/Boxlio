export default (state={}, action) => {
    switch(action.type){
        case 'SEND_REQUEST':
            return {
                ...state,
                requestSent: true
            }
    }
    return state;
}