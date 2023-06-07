import { useNavigate } from "react-router-dom";
import Content from "../../components/content"
import Header from "../../components/header"
import { SketchComponent } from "./P5/sketch"
import { useEffect } from "react";
import Sketch from "react-p5";
// import p5Types from "p5";
// import p5 from "p5";
// import * as p5 from "./libraries/p5.js";

// import { useAuth } from "../context/AuthContext";

const PongPage = () => {
	const navigate = useNavigate();
    
    // const sketch = (p5: p5Types) => {
    //     p5.setup = () => {
    //         p5.createCanvas(600, 400);
    //     } 
      
    //     p5.draw = () => {
    //       p5.background(250);
    //     };
    //   };

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