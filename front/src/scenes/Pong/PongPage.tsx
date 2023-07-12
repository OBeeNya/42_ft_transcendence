import { useNavigate } from "react-router-dom";
import Content from "../../components/content"
import Header from "../../components/header"
import { ax } from "../../services/axios/axios";

const PongPage = () => {

	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const matchMaking = async () => {
		try {
			const response = await ax.get("http://localhost:8080/users/me", {
				headers: { Authorization: `Bearer ${token}` },
			});
			const players = await ax.get(
				'pong/getPlayers',
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (players.data.length < 2 && players.data.includes(response.data.name) === false) {
				await ax.patch(
					'pong/addPlayer',
					{ name: response.data.name },
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				navigate('/pongGame');
			}
			else if (players.data.includes(response.data.name) === false)
				navigate('/matchmaking');
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
			// console.log(players.data);
			if (players.data !== 2) {
				const messageSpectating = document.getElementById("messageSpectating");
				if (messageSpectating)
					messageSpectating.textContent = "No game is currently being played";
			}
			else
				navigate('/pongGame');
		} catch {
			console.error('could not spectate');
		}
	}

	return (
		<div>
			<Header />
			<Content>
				<h1>Pong page</h1>
				<br></br>
				<button onClick={matchMaking}>Multi Player</button>
				<br></br>
				<button onClick={matchMaking}>Multi Player but with a cat</button>
				<br></br>
				<button onClick={spectating}>Spectator mode</button>
				<div id="messageSpectating"></div>
				<button onClick={() => navigate("/pongGameSolo")}>Single player</button>
				<br></br>
			</Content>
		</div>
	);

};

export default PongPage;
