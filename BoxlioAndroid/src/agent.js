import _superagent from "superagent";
import superagentPromise from "superagent-promise";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://373fc370.ngrok.io/api';

const getBody = res => res.body;

const requests = {
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

const Clients = {
    all: () =>
        requests.get(`/clients`),
	clientMessage: name =>
		requests.get(`/${name}/lastmessage`)
};

let token = null;
let tokenPlugin = req => {
	if(token){
		req.set('authorization', `Token ${token}`)
	}
};

export default {
	Auth,
	Clients,
	setToken: _token => {token = _token}
}