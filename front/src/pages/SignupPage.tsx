import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ax } from '../axios/axios'
import axios from 'axios';
import { AuthDto } from "../../../back/auth/dto";

const SignupPage = () => {

	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	
	const navigate = useNavigate();
	
	// const handleSignup = async () => {
	const handleSignup = () => {
		try {
			const dto: AuthDto = {
				name: "abx",
				password: "123",
			};
			// await ax.post('auth/signup', dto);
			ax.post('auth/signup', dto);
			navigate('/welcome');
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
			<button onClick={handleSignup}>Submit</button>
		</div>
	);

};

export default SignupPage;
