import { useLocation, useNavigate } from "react-router-dom";
import { ax } from "../../services/axios/axios";
import { useEffect, useState } from "react";

const PongRecord = () => {

	const	navigate = useNavigate();
	const	[currentTime, setCurrentTime] = useState(new Date());
	const	location = useLocation();
	const	params = new URLSearchParams(location.search);
	const	wons = params.get('won');
	let		won: Boolean;
	const	token = localStorage.getItem('token');
	let		response: any;
	let		exp: number;
	let		w: number
	let		l: number
	let		ladder: number;

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, []);

    const RecordGame = async () => {
		if (wons === 'true')
			won = true;
		else
			won = false;
		try {
			response = await ax.get('http://localhost:8080/users/me', {
				headers: { Authorization: `Bearer ${token}` }
            });
            ladder = response.data.ladder_level;
            w = response.data.wins;
            l = response.data.losses;
            await ax.post('match-history', {
					ladder: ladder,
					won: won,
					gameDate: currentTime.toLocaleDateString(),
				}, {
					headers: {
						Authorization: `Bearer ${token}`
					},
			});
        } catch {
            console.error('could not RecordGame');
        }
    };

	const RecordWinLoss = async () => {
		// try {
			console.log(response.data.wins);
			console.log(response.data.losses);
			// if (won === true) {
			// 	await ax.patch('users',
			// 		{ wins: response.data.wins + 1 },
			// 		{ headers: { Authorization: `Bearer ${token}` }});
				// exp = response.data.exp + 100 / ladder;
			// }
			// else {
			// 	await ax.patch('users',
			// 		{ losses: response.data.losses + 1 },
			// 		{ headers: { Authorization: `Bearer ${token}` }});
				// exp = response.data.exp;
			// }
        // } catch {
        //     console.error('could not RecordWinLoss');
        // }
    };

	const RecordExp = async () => {
		// try {
		// 	if (exp >= 100)
		// 		await ax.patch('users', {
		// 				ladder: response.data.ladder + 1,
		// 				exp: 0,
		// 			},
		// 			{ headers: { Authorization: `Bearer ${token}` }});
		// 	else
		// 		await ax.patch('users',
		// 			{ exp: exp },
		// 			{ headers: { Authorization: `Bearer ${token}` }});
        // } catch {
        //     console.error('could not RecordExp');
        // }
        navigate("/pong");
    };

    RecordGame();
	RecordWinLoss();
	RecordExp();

	return (
		<div>
		</div>
	);

};

export default PongRecord;
