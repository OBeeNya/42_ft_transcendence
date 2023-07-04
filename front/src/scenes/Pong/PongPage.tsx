import { useNavigate } from "react-router-dom";
import Content from "../../components/content"
import Header from "../../components/header"
import { useEffect, useState } from "react";
import { UserInfos } from "../../services/interfaces/userInfos.interface";
import { ax } from "../../services/axios/axios";

const PongPage = () => {

	const navigate = useNavigate();
	const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
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

	// const matchMaking = async () => {
	// 	try {
	// 		let url = '';
	// 		const response = await ax.patch("pong/addPlayerToWaitingList", {
	// 			name: userInfos?.name,
	// 			id: userInfos?.id,
	// 		}, {
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		});
	// 		if (response.data.length === 1)
	// 			url = `/pongGame/${userInfos?.id}`;
	// 		else {
	// 			url = `/pongGame/${response.data[0].id}`;
	// 			await ax.patch('pong/removePlayerFromWaitingList',
	// 				response.data[0], {
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			});
	// 		}
	// 		navigate(url);
	// 	}
	// 	catch {
	// 		console.error('could not handle matchmaking');
	// 	}
	// }

	const matchMaking = async () => {
		try {
			const players = await ax.get(
				'pong/getPlayers',
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (players.data < 2) {
				await ax.patch(
					'pong/addPlayer',
					{ add: 'adding' },
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				navigate('/pongGame');
			}
			else {
				navigate('/matchmaking');
			}
		} catch {
			console.error('could not matchmake');
		}
	}

	const spectating = async () => {
		try {
			const players = await ax.get(
				'pong/getPlayers',
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (players.data !== 2) {
				const messageSpectating = document.getElementById("messageSpectating");
				if (messageSpectating)
					messageSpectating.textContent = "No game is currently being played";
			}
			else {
				await ax.patch(
					'pong/addPlayer',
					{ add: 'adding' },
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				navigate('/pongGame');
			}
		} catch {
			console.error('could not matchmake');
		}
	}

	return (
		<div>
			<Header />
			<Content>
				<h1>Pong page</h1>
				<br></br>
				<button onClick={matchMaking}>Multi Player</button>
				<button onClick={spectating}>Spectator mode</button>
				<div id="messageSpectating"></div>
				<button onClick={() => navigate("/pongGameSolo")}>One player</button>
				<button onClick={() => navigate("/home")}>Home</button>
				<br></br>
			</Content>
		</div>
	);

};

export default PongPage;
