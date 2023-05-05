import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthDto } from "../../../back/auth/dto";
import { ax } from '../axios/axios'

const SigninPage = () => {

	const [nameInput, setName] = useState('');
	const [passwordInput, setPassword] = useState('');
	
	const navigate = useNavigate();
	
	const handleSignin = () => {
		const dto: AuthDto = {
			name: nameInput,
			password: passwordInput,
		};
		ax.post('auth/signin', dto)
			.then(
				() => {navigate('/home')}
			)
			.catch(
				() => {navigate('/')}
			);
	};

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
		</div>
	);

};

export default SigninPage;
