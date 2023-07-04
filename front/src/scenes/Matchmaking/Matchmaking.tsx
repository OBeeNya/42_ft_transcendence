import { useEffect, useState } from "react";
import { ax } from "../../services/axios/axios";
import { useNavigate } from "react-router-dom";

const MatchmakingPage = () => {

	const token = localStorage.getItem("token");
	const navigate = useNavigate();

    const checkVariableValue = async () => {
        try {
			const response = await ax.get(
				'pong/getPlayers',
				{ headers: { Authorization: `Bearer ${token}` } }
			);
            console.log(response.data);
            if (response.data === 0)
                navigate('/pongGame');
        } catch {
            console.error('could not get players in match making');
        }
    };

    useEffect(() => {
        const interval = setInterval(checkVariableValue, 500);
        return () => {
            clearInterval(interval);
        };
    }, []);

	return (
		<div>
			Waiting to be match maked baby...
		</div>
		
	);

};

export default MatchmakingPage;
