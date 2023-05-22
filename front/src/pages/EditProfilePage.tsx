import { Link } from "react-router-dom";
import Content from "../components/content"
import Header from "../components/header"
import { ChangeEvent, useEffect, useState } from "react";
import { ax } from '../axios/axios'
import { UserInfos } from "../interfaces/userInfos.interface";

const EditProfilePage = () => {

	const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
	const [nameInput, setName] = useState('');
	const [emailInput, setEmail] = useState('');
	const token = localStorage.getItem("token");

	useEffect(() => {
		const getUsers = async () => {
		  try {
			const response = await ax.get("http://localhost:8080/users/me", {
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
		if (nameInput === '' && emailInput === '')
			return ;
		try {
			if (nameInput !== '') {
				await ax.patch('users', {
					name: nameInput,
				}, {
					headers: {
						Authorization: `Bearer ${token}`
					},
				});
			}
			const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
			const messageEmail = document.getElementById("messageEmail");
			if (emailInput !== '') {
				if (!expression.test(emailInput)) {
					if (messageEmail)
						messageEmail.textContent = "Please enter a valid email";
				}
				else {
					await ax.patch('users', {
						email: emailInput,
					}, {
						headers: {
							Authorization: `Bearer ${token}`
						},
					});
					if (messageEmail)
						messageEmail.textContent = "";
				}	
			}
			const message = document.getElementById("message");
			if (message)
				message.textContent = "Profile updated";
			window.location.reload();
		}
		catch {
			const message = document.getElementById("message");
			if (message)
				message.textContent = "Name already taken";
		}
	};

	const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files)
			return ;
		const file = event.target.files[0];
		const form = new FormData();
		form.append("file", file, file.name);
		try {
			await ax.post("users/avatar", form, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				}
			});
		}
		catch {
			const messageAvatar = document.getElementById("messageAvatar");
			if (messageAvatar)
				messageAvatar.textContent = "Could not upload avatar, please make sure an .jpg, .jpeg or .png file was used";
		}
	}

	return (
		<div>
			<Header />
			<Content>
				<h1>User profile</h1>
				<br></br>
					<h2>Verify your information and update any available field as necessary</h2>
				<br></br>
					<label>Your avatar:</label>
				<br></br>
					<img
						src={'/avatar/' + userInfos?.name + '.png'}
						alt="avatar"
					/>
				<br></br>
				<div>
					<label>Upload a new avatar:</label>
					<input
						type='file'
						onChange={handleAvatarChange}
					/>
					<div id="messageAvatar"></div>
				</div>
				<br></br>
					Your name: {userInfos?.name}
				<br></br>
					<label>Change your name:</label>
					<input
						type="text"
						value={nameInput}
						onChange={(event) => setName(event.target.value)}
					/>
				<br></br>
				<br></br>
					Your email: {userInfos?.email}
				<br></br>
					<label>Change your email:</label>
					<input
						type="email"
						value={emailInput}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<div id="messageEmail"></div>
				<br></br>
				<br></br>
					<button onClick={handleChanges}>Submit</button>
					<div id="message"></div>
				<br></br>
				<br></br>
				<Link to="/home">Home</Link>
				<br></br>
			</Content>
		</div>
	);

};

export default EditProfilePage;
