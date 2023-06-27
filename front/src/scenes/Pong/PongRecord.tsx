import { useLocation, useNavigate } from "react-router-dom";
import { ax } from "../../services/axios/axios";

const PongRecord = () => {

	const navigate = useNavigate();
	// const [currentTime, seCurrentTime] = use

    const Record = async () => {
		const location = useLocation();
		const params = new URLSearchParams(location.search);
		const wons = params.get('won');
		let won: Boolean;
		if (wons === 'true')
			won = true;
		else
			won = false;
		try {
			const token = localStorage.getItem('token');
			const response = await ax.get('http://localhost:8080/users/me', {
				headers: { Authorization: `Bearer ${token}` }
            });
            const ladder = response.data.ladder_level;
            await ax.post('match-history', {
					ladder: ladder,
					won: won,
					gameDate: 'test',
				}, {
					headers: {
						Authorization: `Bearer ${token}`
					},
			});
			const exp = response.data.exp + 100 / ladder;
			// patch user exp and ladder_level
        } catch {
            console.error('could not add match history');
        }
        navigate("/pong");
    };
    Record();

	return (
		<div>
		</div>
	);

};

export default PongRecord;
