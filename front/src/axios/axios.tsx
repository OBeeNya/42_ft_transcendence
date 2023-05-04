import axios from 'axios';

export const ax = axios.create({
	baseURL: "http://localhost:3333/",
	// withCredentials: true,
	// headers: {
	// 	"Access-Control-Allow-Origin": "http://localhost:3333/",
		// "Access-Control-Allow-Credentials": "true",
	// },
});
