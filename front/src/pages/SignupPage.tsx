import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ax } from '../axios/axios'
import { AxiosError } from 'axios'
import { AuthDto } from "../../../back/auth/dto";

const SignupPage = () => {

	const [nameInput, setName] = useState('');
	const [passwordInput, setPassword] = useState('');
	
	const navigate = useNavigate();
	
	const handleSignup = async () => {
		try {
			const dto: AuthDto = {
					name: nameInput,
					password: passwordInput,
				};
			const response = await ax.post('auth/signup', dto);
			console.log("response status =====>", response.status);
			if (response.status === 200 || response.status === 201) {
				navigate('/');
			}
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string; statusCode: number }>;

			if (axiosError?.response?.data?.message === "Credentials taken") {
				const message = document.getElementById("message");
				
				if (message) { message.textContent = "This userName is already taken"; }
				console.log("This userName is already taken");
			
			} else {
				console.error('Failed to sign up');
			}
		}
	};
	
	return (
		<div>
			<h1>Signup</h1>
			<div>
				<label>Name:</label>
				<input
					type="text"
					value={nameInput}
					onChange={(event) => setName(event.target.value)}
				/>
			</div>
			<div>
				<label>Password:</label>
				<input
					type="password"
					value={passwordInput}
					onChange={(event) => setPassword(event.target.value)}
				/>
			</div>
			<button onClick={handleSignup}>Submit</button>
			<div id="message"></div>
		</div>
	);

};

export default SignupPage;
