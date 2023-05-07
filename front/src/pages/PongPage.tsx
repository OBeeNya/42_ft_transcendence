import { Link } from "react-router-dom";
import Content from "../components/content"
import Header from "../components/header"

const PongPage = () => {

	return (
		<div>
			<Header name=""/>
			<Content>
				<h1>Pong page</h1>
				<br></br>
				<Link to="/home">Home</Link>
				<br></br>
			</Content>
		</div>
		
	);

};

export default PongPage;
