import { useNavigate } from "react-router-dom";
import Content from "../components/content"
import Header from "../components/header"
// import { useAuth } from "../context/AuthContext";

const PongPage = () => {
	const navigate = useNavigate();
	// const { checkUserConnection, isConnected } = useAuth();

	// const handleClick = async (destination: string) => {
	// 	await checkUserConnection();
		
		
	// 	if (isConnected) {
	// 		console.log("user is not connected");
	// 		navigate(destination);
	// 	}
	//   };

	return (
		<div>
			<Header />
			<Content>
				<h1>Pong page</h1>
				<br></br>
				<button onClick={() => navigate("/home")}>Home</button>
				<br></br>
			</Content>
		</div>
		
	);

};

export default PongPage;
