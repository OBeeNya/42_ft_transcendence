import { useNavigate } from "react-router-dom";
// import React, { useState } from 'react';
import Content from "../../components/content"
import Header from "../../components/header"
import { ax } from "../../services/axios/axios";
import Select from 'react-select'

const PongPage = () => {

	const navigate = useNavigate();
	const token = localStorage.getItem("token");

    const options = [
        { value: 'Classic', label: 'Classic' },
        { value: 'Terrifying Cat', label: 'Terrifying Cat' },
      ]

	const matchMaking = async () => {
		try {
			const response = await ax.get("http://localhost:8080/users/me", {
				headers: { Authorization: `Bearer ${token}` },
			});
			const players = await ax.get(
				'pong/getPlayers',
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (players.data.length < 2 && players.data.includes(response.data.name) === false) {
				await ax.patch('users',
					{ playing: true },
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				await ax.patch(
					'pong/addPlayer',
					{ name: response.data.name },
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				navigate('/pongGame');
			}
			else if (players.data.includes(response.data.name) === false)
				navigate('/matchmaking');
		} catch {
			console.error('could not matchmake');
		}
	}

	const spectating = async () => {
		try {
			const players = await ax.get(
				'pong/getPlayers',
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (players.data.length !== 2) {
				const messageSpectating = document.getElementById("messageSpectating");
				if (messageSpectating)
					messageSpectating.textContent = "No game is currently being played";
			} else
				navigate('/pongGame');
		} catch {
			console.error('could not spectate');
		}
	}
    const handleSelectMap = (selectedOption: any) => {
        if (selectedOption.value === "Classic") 
            console.log("Classic!!!"); 
        else if (selectedOption.value === "Terrifying Cat")
            console.log("Terrifying cat!!!"); 
    }         

	return (
		<div>
			<Header />
			<Content>
				<h1>Pong page</h1>
				<br></br>
				<br></br>
                <label >Choose a map:</label>
				<br></br>
				<br></br>
                <Select 
                        styles={{
                            control: (baseStyles, state) => ({
                            ...baseStyles,

                            }),
                            menuList: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: '#060d22',
                                color: 'white',

                                }),
                        }}
                        options={options}
                        onChange={handleSelectMap} />
				<br></br>
				<br></br>
				<button onClick={matchMaking}>Multi Player</button>
				<br></br>
				<br></br>
				<button onClick={matchMaking}>Multi Player but with a cat</button>
				<br></br>
				<br></br>
				<button onClick={spectating}>Spectator mode</button>
				<div id="messageSpectating"></div>
				<button onClick={() => navigate("/pongGameSolo")}>Single player</button>
				<br></br>
			</Content>
		</div>
	);

};

export default PongPage;
