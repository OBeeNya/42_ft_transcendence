import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Content from "../../components/content"
import Header from "../../components/header"
import Canvas from './PongPageCanvas'

const PongPage2 = () => {

    const navigate = useNavigate();
    const handleQuit = () => {
        navigate("/pong");
        window.location.reload();
    };
    
    
    return (
        <div>
            <Content>
                <h1>Pong</h1>
                <div>
                    {/* <canvas ref={canvasRef} {...props}/> */}
                    <Canvas />
                </div>

                <button onClick={() => handleQuit()}>Quit</button>
            </Content>
        </div>

        );
    };


export default PongPage2;
