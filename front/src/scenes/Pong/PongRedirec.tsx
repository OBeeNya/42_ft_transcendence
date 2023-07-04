import { useNavigate } from "react-router-dom";
import { ax } from "../../services/axios/axios";

const PongRedirecPage = () => {

	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const remove = async () => {
		try {
			await ax.patch(
				'pong/removePlayer',
				{ rem: 'removing' },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
		} catch {
			console.error('could not remove player when opponent quit game')
		}
        navigate("/pong");
	}
	remove();

	return (
		<div>
		</div>
		
	);

};

export default PongRedirecPage;
