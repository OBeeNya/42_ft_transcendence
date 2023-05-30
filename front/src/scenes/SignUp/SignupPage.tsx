import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ax } from '../../services/axios/axios'
import { AxiosError } from 'axios'
import { AuthDto } from "../../../../back/auth/dto";
import Content from "../../components/content"


const SignupPage = () => {

	const [nameInput, setName] = useState('');
	const [passwordInput, setPassword] = useState('');
	const [emailInput, setEmail] = useState('');

	const navigate = useNavigate();
	
	const handleSignup = async () => {
		try {
			const dto: AuthDto = {
					name: nameInput,
					password: passwordInput,
					email: emailInput,
				};
			var expression = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
			// if (!expression.test(dto.password)) {
			// 	const messagePwd = document.getElementById("messagePwd");
			// 	if (messagePwd)
			// 		messagePwd.textContent = "Your password must contain at least 8 characters, 1 lowercase and 1 uppercase alphabetical character, 1 numeric character and 1 special character";
			// 		return ;
			// }
			expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
			if (!expression.test(dto.email)) {
				const messageEmail = document.getElementById("messageEmail");
				if (messageEmail)
					messageEmail.textContent = "Please enter a valid email";
				return ;
			}
			const response = await ax.post('auth/signup', dto);
			if (response.status === 200 || response.status === 201)
				navigate('/');
			// window.location.reload();
		}
		catch (error) {
			console.log(error);
			const axiosError = error as AxiosError<{ message: string; statusCode: number }>;
			if (axiosError?.response?.data?.message === "Credentials taken") {
				const message = document.getElementById("message");
				if (message)
					message.textContent = "This userName is already taken";
				console.error("Failed signin up.");
				console.error("axiosError?.response?.data?.message: ", axiosError?.response?.data?.message);
			}
			// else
			// 	console.error('Failed to sign up');
		};
	};

	return (
		<Content>
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
					<div id="messagePwd"></div>
				</div>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={emailInput}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<div id="messageEmail"></div>
				</div>
				<button onClick={handleSignup}>Submit</button>
				<div id="message"></div>
			</div>
		</Content>
	);

};

export default SignupPage;
