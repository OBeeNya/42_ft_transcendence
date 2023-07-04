import { useNavigate } from "react-router-dom";
import Content from "../../components/content"
import { SketchComponent } from "./P5/sketch"
import { ax } from "../../services/axios/axios";

const PongPage = () => {

	const navigate = useNavigate();
	const token = localStorage.getItem("token");

    const handleQuit = async () => {
		try {
			await ax.patch(
				'pong/removePlayer',
				{ rem: 'removing' },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
		} catch {
			console.error('could not remove player when quitting');
		}
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
