import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ax } from '../axios/axios'
import { AuthDto } from "../../../back/auth/dto";

const SignupPage = () => {

	const [nameInput, setName] = useState('');
	const [passwordInput, setPassword] = useState('');
	
	const navigate = useNavigate();
	
	const handleSignup = () => {
		const dto: AuthDto = {
			name: nameInput,
			password: passwordInput,
		};
		ax.post('auth/signup', dto)
			.then(
				() => {navigate('/')}
			)
			.catch(
			// display error message	
			);
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
		</div>
	);

};

export default SignupPage;
