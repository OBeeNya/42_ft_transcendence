import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const axios = require('axios');

const SignupPage = () => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const handleSignup = async () => {
		try {
			await axios.Post('/auth/signup',{
					name,
					password,
				});
			navigate('/');
		}
		catch (error: unknown) {
			if (error instanceof AxiosError)
				setErrorMessage(error.response?.data.message);
		}
	};
	return (
		<div>
			<h1>Signup</h1>
			{errorMessage && <div>{errorMessage}</div>}
			<div>
				<label>Name:</label>
				<input
					type="text"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
			</div>
			<div>
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
			</div>
			<button onClick={handleSignup}>Signup</button>
		</div>
	);
};

export default SignupPage;
