import { useNavigate } from "react-router-dom";
import { ax } from "../../services/axios/axios";
import Content from "../../components/content"
import Header from "../../components/header"
import { SketchComponent } from "./P5/sketch"
import { useEffect } from "react";
// import Sketch from "react-p5";
// import p5Types from "p5";
// import p5 from "p5";
// import * as p5 from "./libraries/p5.js";

// import { useAuth } from "../context/AuthContext";

const PongPage = () => {
	const navigate = useNavigate();
    
    const token = localStorage.getItem("token");

    useEffect(() => {
		const connectServerSocket = async () => {
			try {
                console.log("pongGame front test");
				const response = await ax.get("http://localhost:8080/pong/", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
                console.log("response: ", response);
			} catch (error) {
				console.error("Failed to fetch Pong socket.");
			}
		};
		connectServerSocket();
	}, [token]);

	return (
		<div>
			<Header />
			<Content>
				<h1>Pong</h1>
				<br></br>
                <SketchComponent />

				<button onClick={() => navigate("/home")}>Home</button>
				<br></br>
			</Content>
		</div>
		
	);

};

export default PongPage;