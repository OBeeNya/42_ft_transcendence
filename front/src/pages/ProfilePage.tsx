import { Link, useLocation } from "react-router-dom";
import Content from "../components/content"
import Header from "../components/header"
import { useEffect, useState } from "react";
import { ax } from '../axios/axios'
import { UserInfos } from "../interfaces/userInfos.interface";

const ProfilePage = () => {

	const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
	const [nameInput, setName] = useState('');
	const [emailInput, setEmail] = useState('');
	const { state: { token } } = useLocation();

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

	return (
		<div>
			<Header name=""/>
			<Content>
				<h1>User profile</h1>
				<br></br>
					<h2>Update any available field as you please</h2>
				<br></br>
					<label>Your avatar:</label>
				<br></br>
					<img
						src={'/avatar/' + userInfos?.name + '.png'}
						alt="avatar"
					/>
				<br></br>
					<label>Upload a new avatar:</label>
					<input
						type='file'
					/>
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
					Wins: {userInfos?.wins}
				<br></br>
					Losses: {userInfos?.losses}
				<br></br>
					Ladder lever: {userInfos?.ladder_level}
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

export default ProfilePage;
