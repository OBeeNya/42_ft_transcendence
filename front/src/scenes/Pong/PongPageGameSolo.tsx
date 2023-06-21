import { useNavigate } from "react-router-dom";
import Content from "../../components/content"
import Header from "../../components/header"
import { SketchComponentSolo } from "./P5/sketchSolo"

const PongPage = () => {

	const navigate = useNavigate();

    const handleQuit = () => {
        navigate("/pong");
        window.location.reload();
      };

	return (
		<div>
			{/* <Header /> */}
			<Content>
				<h1>Pong</h1>
				<br></br>
                <SketchComponentSolo/>
				<button onClick={() => handleQuit()}>Quit</button>
				<br></br>
			</Content>
		</div>
		
	);

};

export default PongPage;
