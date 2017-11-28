export default (state={}, action) => {
    switch(action.type){
        case 'PROFILE_PAGE_LOADED':
            return {
                ...state,
                profile: action.payload.profile
            }
    }
    return state;
}