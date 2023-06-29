import { useLocation, useNavigate } from "react-router-dom";
import { ax } from "../../services/axios/axios";
import { useEffect, useState } from "react";

const PongRecord = () => {

	const navigate = useNavigate();
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, []);

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
					gameDate: currentTime.toLocaleDateString(),
				}, {
					headers: {
						Authorization: `Bearer ${token}`
					},
			});
			let exp;
			if (won === true) {
				console.log(response.data.wins + 1);
				await ax.patch('users', {
					wins: response.data.wins + 1,
				},
				{ headers: { Authorization: `Bearer ${token}` }});
				exp = response.data.exp + 100 / ladder;
			}
			else {
				console.log(response.data.losses + 1);
				await ax.patch('users', {
					losses: response.data.losses + 1,
				},
				{ headers: { Authorization: `Bearer ${token}` }});
				exp = response.data.exp;
			}
			if (exp >= 100)
				await ax.patch('users', {
					ladder: response.data.ladder + 1,
					exp: 0,
				},
				{ headers: { Authorization: `Bearer ${token}` }});
			else
				await ax.patch('users', {
					exp: exp,
				},
				{ headers: { Authorization: `Bearer ${token}` }});
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
