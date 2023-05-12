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
			if (emailInput !== '') {
				await ax.patch('users', {
					email: emailInput,
				}, {
					headers: {
						Authorization: `Bearer ${token}`
					},
				});
			}
			const message = document.getElementById("message");
			if (message)
				message.textContent = "Profile updated";
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
