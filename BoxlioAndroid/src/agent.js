import _superagent from "superagent";
import superagentPromise from "superagent-promise";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://192.168.38.196:8000/api';

const getBody = res => res.body;

const requests = {
	get: url =>
		superagent.get(`${API_ROOT}${url}`).then(getBody),
	post: (url, body) =>
		superagent.post(`${API_ROOT}${url}`, body).then(getBody)
};

const Auth = {
	login: (email, password) =>
		requests.post('/users/login', {user: {email, password}})
};

export default {
	Auth
}