import { useNavigate } from "react-router-dom";
import Content from "../../components/content"
import Header from "../../components/header"
import { useLayoutEffect } from "react";

const PongPage = () => {
	const navigate = useNavigate();

	useLayoutEffect(() => {
		
	})

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
