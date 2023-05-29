import { useEffect, useState } from 'react';
import { ax } from '../../services/axios/axios'
import { UserInfos } from '../../services/interfaces/userInfos.interface';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const TfaPage = () => {
	
	const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
	const token = localStorage.getItem("token");
	const [codeInput, setCode] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axios.get("http://localhost:8080/users/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setUserInfos(response.data);
			} catch (error) {
				console.error("Failed to fetch users.");
			}
		};
		getUsers();
	}, [token]);

	const handleChanges = async () => {
		if (codeInput === '')
			return ;
		try {
			const response = await ax.post("http://localhost:8080/users/qrcode/verify",
				{ name: userInfos?.name, otp: codeInput }, {
				headers: { Authorization: `Bearer ${token}`, },
			});
			if (response.data)
				navigate('/editprofile');
			else {
				navigate('/');
				localStorage.setItem("token", "");
				localStorage.setItem("isConnected", "no");
				localStorage.setItem("userStatus", "offline");
				await ax.patch("users", {
					connected: false,
				}, {
					headers: {
						Authorization: `Bearer ${response.data.access_token}`
					},
				});
			}
		}
		catch {
			console.log("could not verify qrcode");
		}
	}

	return (
		<div>
			<label>Enter your verification code:</label>
			<input
				type="text"
				value={codeInput}
				onChange={(event) => setCode(event.target.value)}
			/>
			<button onClick={handleChanges} >Submit</button>
		</div>
	);
};

export default TfaPage;
