import { useNavigate } from "react-router-dom";
import Content from "../../components/content"
import Header from "../../components/header"
import { useEffect, useState } from "react";
import { UserInfos } from "../../services/interfaces/userInfos.interface";
import { ax } from "../../services/axios/axios";
import io from "socket.io-client"

const PongPage2 = () => {
    
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    let socket: any;

    socket = io('http://localhost:8080/menuPong2');
    socket.on('connect', () => console.log("connected"));

	const join_public = () => {
        if (username === "") {
          alert("Enter your username");
          return;
        }
      
        socket.emit("join_public", username);
        socket.on("public_validation", (validate: any, message: string) => {
          if (validate === 1) {
            navigate(`/pongGame2/public/${username}`);
          } else {
            alert(message);
            return;
          }
        });
      };
      
      const create_private = () => {
        if (username === "") {
          alert("Enter your username");
          return;
        }
      
        let room_code = window.prompt("Enter the room code to create", "");
        if (room_code === null || room_code === "") {
          alert("Room code is empty");
          return;
        }
        if (room_code === "public") {
          alert("You cannot use that name as the room code");
          return;
        }
      
        socket.emit("create_private", username, room_code);
        socket.on("create_validation", (validate: any, message: string) => {
          if (validate === 1) {
            navigate(`/private/${room_code}/${username}`);
          } else {
            alert(message);
            return;
          }
        });
      };
      
      const join_private = () => {
        if (username === "") {
          alert("Enter your username");
          return;
        }
      
        let room_code = window.prompt("Enter the room code to join", "");
        if (room_code === null || room_code === "") {
          alert("Room code is empty");
          return;
        }
      
        if (room_code === "public") {
          alert("You cannot use that name as the room code");
          return;
        }
      
        socket.emit("join_private", username, room_code);
        socket.on("join_validation", (validate: any, message: string) => {
          if (validate) {
            navigate(`/private/${room_code}/${username}`);
          } else {
            alert(message);
            return;
          }
        });
      };

	return (
		<div>
			<Header />
			<Content>
            <h1>Pong page 2</h1>
                <br />
                <br />
                <div className="center-contents">
                    <h1>Pong</h1>
                    <div className="username_input">
                        <input
                            className="inputbox"
                            id="username"
                            name="username"
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <br />
                    <button onClick={join_public}>Join Public Game</button>
                    <button onClick={create_private}>Create Private Game</button>
                    <button onClick={join_private}>Join Private Game</button>
                    <img src="" id="logo" />
                </div>
                
			</Content>
		</div>
	);

};

export default PongPage2;
