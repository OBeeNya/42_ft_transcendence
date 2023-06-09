import { useNavigate } from "react-router-dom";
import Content from "../../components/content"
import Header from "../../components/header"
import { useEffect, useState } from "react";
import { UserInfos } from "../../services/interfaces/userInfos.interface";
import { ax } from '../../services/axios/axios'
// import { useAuth } from "../context/AuthContext";

const PongPage = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
	// const { checkUserConnection, isConnected } = useAuth();

	// const handleClick = async (destination: string) => {
	// 	await checkUserConnection();
		
		
	// 	if (isConnected) {
	// 		console.log("user is not connected");
	// 		navigate(destination);
	// 	}
	//   };

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

	const handleMatchmaking = async () => {
		try {
			await ax.post('pong/addPlayerToWaitingList', {
				name: userInfos?.name,
				level: userInfos?.ladder_level,
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				},
			});
		}
		catch {
			console.error('could not add player to waiting list');
		}
	}

	return (
		<div>
			<Header />
			<Content>
				<h1>Pong page</h1>
				<br></br>
				<button onClick={() => navigate("/pongGame")}>Game</button>
				<button onClick={handleMatchmaking}>Matchmaking</button>
				<button onClick={() => navigate("/home")}>Home</button>
				<br></br>
			</Content>
		</div>
		
	);

};

export default PongPage;
