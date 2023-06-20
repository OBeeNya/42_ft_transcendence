import { useNavigate } from "react-router-dom";
import Content from "../../components/content"
import Header from "../../components/header"
import { SketchComponent } from "./P5/sketch"

const PongPage = () => {

	const navigate = useNavigate();

	return (
		<div>
			<Header />
			<Content>
				<h1>Pong</h1>
				<br></br>
                <SketchComponent/>
				<button onClick={() => navigate("/home")}>Home</button>
				<br></br>
			</Content>
		</div>
		
	);

};

export default PongPage;
