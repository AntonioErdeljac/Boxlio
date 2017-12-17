import _superagent from "superagent";
import superagentPromise from "superagent-promise";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://fc4b53b4.ngrok.io/api';

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

let token = null;
let tokenPlugin = req => {
	if(token){
		req.set('authorization', `Token ${token}`)
	}
};

export default {
	Auth,
	setToken: _token => {token = _token}
}