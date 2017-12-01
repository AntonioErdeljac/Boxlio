import _superagent from "superagent";
import superagentPromise from "superagent-promise";
import * as routes from "./constants/routes";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = routes.API_ROOT;

const responseBody = res => res.body;

const requests = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
    login: (email, password) =>
        requests.post(`${routes.users_login}`, {user: {email, password}}),
    register: (firstName, lastName, username, email, password, location, type) =>
        requests.post(`${routes.user}`, {user: {firstName, lastName, username, email, password, location, type}}),
    current: () =>
        requests.get(`${routes.user}`),
    update: user =>
        requests.put(`${routes.user}`, {user})
};

const Profiles = {
    all: () =>
        requests.get(`${routes.profiles}`),
    byName: username =>
        requests.get(`${routes.profiles}${username}`),
    add: (client) =>
        requests.post(`${routes.profiles}${client.username}${routes.client}`),
    postOpinion: (opinion) =>
        requests.post(`${routes.profiles}${opinion.profile.username}${routes.opinion}`, {opinion}),
    getOpinions: username =>
        requests.get(`${routes.profiles}${username}${routes.opinions}`)
};

const Chat = {
    byName: name =>
        requests.get(`${routes.chatrooms}${name}`),
    messagesByName: name =>
        requests.get(`${routes.chatrooms}${name}${routes.messages}`),
    all: () =>
        requests.get(`${routes.chatrooms}`)
}

const Clients = {
    all: () =>
        requests.get(`${routes.clients}`)
}

const Explore = {
    nearDeliveryUsers: () =>
        requests.get(`${routes.explore}`)
}

let token = null;
let tokenPlugin = req => {
    if(token){
        req.set('authorization', `Token ${token}`);
    }
};
export default {
    Auth,
    Profiles,
    Chat,
    Clients,
    Explore,
    setToken: _token => {token = _token}
};