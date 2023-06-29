import { useNavigate } from "react-router-dom";
import Content from "../../components/content"
import { SketchComponent } from "./P5/sketch"

const PongPage = () => {

	const navigate = useNavigate();

    const handleQuit = () => {
        navigate("/pong");
        window.location.reload();
      };

	return (
		<div>
			<Content>
				<h1>Pong</h1>
				<br></br>
                <SketchComponent/>
				<button onClick={() => handleQuit()}>Quit</button>
				<br></br>
			</Content>
		</div>
		
	);

};

export default PongPage;
