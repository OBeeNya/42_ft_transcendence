import { useEffect } from "react";
import { ax } from "../../services/axios/axios";
import { useNavigate } from "react-router-dom";
import "./style/Matchmaking.css";

const MatchmakingPage = () => {

	const token = localStorage.getItem("token");
	const navigate = useNavigate();

    const joinGame = async () => {
        await ax.patch(
            'pong/addPlayer',
            { add: 'adding' },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        navigate('/pongGame');
    }

    const checkVariableValue = async () => {
        try {
			const response = await ax.get(
				'pong/getPlayers',
				{ headers: { Authorization: `Bearer ${token}` } }
			);
            if (response.data === 0)
                joinGame();
        } catch {
            console.error('could not get players in match making');
        }
    };

    useEffect(() => {
        const interval = setInterval(checkVariableValue, 500);
        return () => {
            clearInterval(interval);
        };
    });

	return (
        <div className="loading-container">
        <h1 className="loading-text">Searching game...</h1>
        <div className="loading-circle"></div>
      </div>
	);

};

export default MatchmakingPage;
