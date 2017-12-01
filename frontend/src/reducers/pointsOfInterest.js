import * as actions from "../constants/actions";

export default (state={}, action) => {
    switch(action.type){
        case actions.SET_NEAR_STORES:
            console.log(action.results, 'IN REDUCER');
            return {
                ...state,
                stores: action.results,
                nearStoresLoaded: true
            };
    }
    return state;
}