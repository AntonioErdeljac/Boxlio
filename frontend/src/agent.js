import _superagent from "superagent";
import superagentPromise from "superagent-promise";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = '//localhost:8000/api';

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
        requests.post(`/users/login`, {user: {email, password}}),
    register: (firstName, lastName, username, email, password, location, type) =>
        requests.post(`/users`, {user: {firstName, lastName, username, email, password, location, type}}),
    current: () =>
        requests.get(`/user`),
    update: user =>
        requests.put(`/user`, {user})
};

const Profiles = {
    all: () =>
        requests.get(`/profiles`),
    byName: username =>
        requests.get(`/profiles/${username}`),
    add: (client) =>
        requests.post(`/profiles/${client.username}/client`),
    postOpinion: (opinion) =>
        requests.post(`/profiles/${opinion.profile.username}/opinion`, {opinion}),
    getOpinions: username =>
        requests.get(`/profiles/${username}/opinions`)
};

const Chat = {
    byName: name =>
        requests.get(`/chatrooms/${name}`),
    messagesByName: name =>
        requests.get(`/chatrooms/${name}/messages`),
    all: () =>
        requests.get(`/chatrooms`)
}

const Clients = {
    all: () =>
        requests.get(`/clients`)
}

const Explore = {
    nearDeliveryUsers: () =>
        requests.get(`/explore`)
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