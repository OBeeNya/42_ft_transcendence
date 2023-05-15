import { useEffect, useState } from "react";
import { ax } from "../axios/axios";
import Header from "../components/header";
import Content from "../components/content";
import { Link, useLocation } from "react-router-dom";
import { UserInfos } from "../interfaces/userInfos.interface";

const ProfilePage = () => {

	const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
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

	return (
		<div>
			<Header name=""/>
			<Content>
				<h1>User profile</h1>
					<label>Your avatar:</label>
				<br></br>
					<img
						src={'/avatar/' + userInfos?.name + '.png'}
						alt="avatar"
					/>
				<br></br>
				<br></br>
					Your name: {userInfos?.name}
				<br></br>
					Your email: {userInfos?.email}
				<br></br>
					Wins: {userInfos?.wins}
				<br></br>
					Losses: {userInfos?.losses}
				<br></br>
					Ladder lever: {userInfos?.ladder_level}
				<br></br>
				<Link to="/editprofile">Edit your profile information</Link>
				<Link to="/home">Home</Link>
				<br></br>
			</Content>
		</div>
	);

};

export default ProfilePage;
