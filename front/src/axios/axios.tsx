import axios from 'axios';

export const ax = axios.create({
	baseURL: "http://localhost:8080/",
	// withCredentials: true,
	headers: {
		"Access-Control-Allow-Origin": "http://localhost:3000/",
		// "Access-Control-Allow-Credentials": "true",
	},
});
