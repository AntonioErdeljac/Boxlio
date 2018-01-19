import _superagent from "superagent";
import superagentPromise from "superagent-promise";
import * as constants from "./constants/routes";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = `${constants.API_ROOT}/api`;

const getBody = res => res.body;

const requests = {
	getCatalog: url =>
		superagent.get(`${url}`).set('Ocp-Apim-Subscription-Key', constants.TESCO_TOKEN).then(getBody),
	get: url =>
		superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(getBody),
	post: (url, body) =>
		superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(getBody),
	put: (url, body) =>
		superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(getBody)
};

const Auth = {
	login: (email, password) =>
		requests.post('/users/login', {user: {email, password}}),
	current: () =>
		requests.get('/user'),
	update: user =>
		requests.put('/user', {user})
};

const Profile = {
    add: (client) =>
        requests.post(`/profiles/${client.username}/client`),
};

const Clients = {
    all: () =>
        requests.get(`/clients`),
	clientMessage: name =>
		requests.get(`/${name}/lastmessage`)
};

const Catalog = {
	loadInitial: () =>
        requests.getCatalog(`${constants.TESCO_API}?query=coca&offset=0&limit=10`),
    search: query =>
        requests.getCatalog(`${constants.TESCO_API}?query=${query}&offset=0&limit=10`),
}

const Chat = {
    byName: name =>
        requests.get(`/chatrooms/${name}`),
    messagesByName: name =>
        requests.get(`/chatrooms/${name}/messages`),
    all: () =>
        requests.get(`/chatrooms`)
};

const Explore = {
    nearDeliveryUsers: () =>
        requests.get(`/explore`)
}

let token = null;
let tokenPlugin = req => {
	if(token){
		req.set('authorization', `Token ${token}`)
	}
};

export default {
	Auth,
	Clients,
	Chat,
    Explore,
	Profile,
	Catalog,
	setToken: _token => {token = _token}
}