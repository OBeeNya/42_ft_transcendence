import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SigninDto } from "../../../back/auth/dto";
import { ax } from '../axios/axios'
import { AxiosError } from 'axios'
import Content from "../components/content"

const SigninPage = () => {
	const [nameInput, setName] = useState('');
	const [passwordInput, setPassword] = useState('');
	
	const navigate = useNavigate();

	const handleSignin = async () => {
		try {
			const dto: SigninDto = {
				name: nameInput,
				password: passwordInput,
			};
			const response = await ax.post('auth/signin', dto);
			if (response.status === 200) {
				localStorage.setItem("token", response.data.access_token);
				localStorage.setItem("isConnected", "yes");
				localStorage.setItem("userStatus", "connected");
				console.log("setting connected to TRUE");
				navigate('/profile');
			}
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string; statusCode: number }>;
			
			if (axiosError?.response?.data?.message === "Credentials incorrect") {
				const message = document.getElementById("message");
				
				if (message) { message.textContent = "Wrong userName or password"; }
				console.error("Wrong userName or password");
			
			} else {
				console.error('Failed to sign in');
			}
		};
	};
	return (
		// <AuthProvider>
			<Content>
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
			</Content>
		// {/* </AuthProvider> */}
	);

};

export default SigninPage;
