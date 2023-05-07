import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { UserInfos } from "../interfaces/userInfos.interface"

const HomePage = () => {

	const [userInfos, setUserInfos] = useState<UserInfos | null>(null); //creer une interface afin d'acceder a tout

	const { state: { token } } = useLocation();
	console.log("my token: ", token);

	useEffect(() => {
		const getUsers = async () => {
		  try {
			const response = await axios.get("http://localhost:3333/users/me", {
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


	return (
		<div>
			<h1> Hi {userInfos?.name} </h1>
			<h1>Welcome to ft_transcendence!</h1>
			<br></br>
				Your userName: {userInfos?.name}
			<br></br>
				Wins: {userInfos?.wins}
			<br></br>
			Losses: {userInfos?.losses}
			<br></br>
			Ladder lever: {userInfos?.ladder_level}
			<br></br>
			<br></br>
			<Link to="/profile">User profile</Link>
			<br></br>
			<br></br>
			<Link to="/pong">Play pong</Link>
			<br></br>
			<br></br>
			<Link to="/chat">Chat with friends</Link>
			<br></br>
		</div>
	);

};

export default HomePage;
