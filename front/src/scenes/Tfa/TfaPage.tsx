import { useEffect, useState } from 'react';
import { ax } from '../../services/axios/axios'
import { UserInfos } from '../../services/interfaces/userInfos.interface';
import axios from 'axios';

const TfaPage = () => {
	
	const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
	const [qrCodeUrl, setQRCodeUrl] = useState('');
	const token = localStorage.getItem("token");
	const [codeInput, setCode] = useState('');

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

	const getCode = async () => {
		try {
			const response = await ax.post("http://localhost:8080/users/qrcode",
				{ name: userInfos?.name }, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setQRCodeUrl(response.data);
		}
		catch {
			console.log("could not get qrcode");
		}
	}

	const handleChanges = async () => {
		if (codeInput === '')
			return ;
		try {
			const response = await ax.post("http://localhost:8080/users/qrcode/verify",
				{ name: userInfos?.name, otp: codeInput }, {
				headers: { Authorization: `Bearer ${token}`, },
			});
			console.log(response.data);
		}
		catch {
			console.log("could not verify qrcode");
		}
	}

	return (
		<div>
			<button onClick={getCode}>Get qr code</button>
			<img src={qrCodeUrl} alt=""/>
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
