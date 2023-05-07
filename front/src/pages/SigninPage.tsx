import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthDto } from "../../../back/auth/dto";
import { ax } from '../axios/axios'
import { AxiosError } from 'axios'

const SigninPage = () => {

	const [nameInput, setName] = useState('');
	const [passwordInput, setPassword] = useState('');
	
	const navigate = useNavigate();

	const handleSignin = async () => {
		try {
			const dto: AuthDto = {
				name: nameInput,
				password: passwordInput,
			};
			const response = await ax.post('auth/signin', dto);
			if (response.status === 200) {
				navigate('/home')
			}
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string; statusCode: number }>;
			
			if (axiosError?.response?.data?.message === "Credentials incorrect") {
				const message = document.getElementById("message");
				
				if (message) { message.textContent = "Wrong userName or password"; }
				console.log("Wrong userName or password");
			
			} else {
				console.error('Failed to sign in');
			}
			// navigate('/');
		};
	};













	// const handleSignin = () => {
	// 	const dto: AuthDto = {
	// 		name: nameInput,
	// 		password: passwordInput,
	// 	};
	// 	ax.post('auth/signin', dto)
	// 		.then(
	// 			() => {navigate('/home')}
	// 		)
	// 		.catch(
	// 			() => {navigate('/')}
	// 		);
	// };

	return (
		<div>
			<h1>Signin</h1>
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
			<button onClick={handleSignin}>Submit</button>
			<div id="message"></div>
		</div>
	);

};

export default SigninPage;
