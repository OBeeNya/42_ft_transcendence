import { Link } from "react-router-dom";

const HomePage = () => {

	return (
		<div>
			<h1>Welcome to ft_transcendence</h1>
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
