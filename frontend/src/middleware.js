import agent from "./agent";
import * as actions from "./constants/actions";

const promiseMiddleware = store => next => action => {
    if(isPromise(action.payload)){
        store.dispatch({type: actions.ASYNC_START, subtype: action.type});
        action.payload.then(
            res => {
                action.payload = res;
                store.dispatch(action);
            },
            error => {
                action.error = true;
                action.payload = error.response.body;
                store.dispatch(action);
            }
        );
        return;
    }
    next(action)
};

function isPromise(v){
    return v && typeof v.then === 'function';
}

const localStorageMiddleware = store => next => action => {
    if(action.type === actions.LOGIN || action.type === actions.REGISTER){
        if(!action.error){
            window.localStorage.setItem('jwt', action.payload.user.token);
            agent.setToken(action.payload.user.token);
        }
    } else if(action.type === actions.LOGOUT){
        window.localStorage.setItem('jwt', '');
        agent.setToken(null);
        window.location.reload();
    }
    next(action);
};

export {
    localStorageMiddleware,
    promiseMiddleware
}