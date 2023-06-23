import { useNavigate } from "react-router-dom";
import { ax } from "../../services/axios/axios";

const PongRecord = () => {

	const navigate = useNavigate();

    const record = async () => {
        const token = localStorage.getItem('token');
        try {
            await ax.post('match-history', {
					opponentName: 'test',
					ladder: 1,
					won: true,
				}, {
					headers: {
						Authorization: `Bearer ${token}`
					},
				});
        } catch {
            console.error('could not add match history');
        }
        navigate("/pong");
    };
    record();

	return (
		<div>
		</div>
	);

};

export default PongRecord;
