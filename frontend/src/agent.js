import _superagent from "superagent";
import superagentPromise from "superagent-promise";
import * as routes from "./constants/routes";
import * as helpers from "./constants/helpers";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = routes.API_ROOT;

const responseBody = res => res.body;

const requests = {
    getTesco: url =>
        superagent.get(`${url}`).set('Ocp-Apim-Subscription-Key', '2888ade9e3d24fdfb07f564ef1317f49').then(responseBody),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    del: url =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
};

const Auth = {
    login: (email, password) =>
        requests.post(`${routes.users_login}`, {user: {email, password}}),
    register: (firstName, lastName, username, email, password, location, type) =>
        requests.post(`${routes.users}`, {user: {firstName, lastName, username, email, password, location, type}}),
    current: () =>
        requests.get(`${routes.user}`),
    update: (user) =>
        requests.put(`${routes.user}`, {user}),
};

const Catalog = {
    loadInitial: () =>
        requests.getTesco(`${helpers.TESCO_API}?query=nutella&offset=0&limit=10`)
}

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
        requests.get(`${routes.profiles}${username}${routes.opinions}`),
    deleteOpinion: (opinion, profile) =>
        requests.del(`${routes.profiles}${profile.username}${routes.opinions}/${opinion._id}`)
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
    Catalog,
    Clients,
    Explore,
    setToken: _token => {token = _token}
};