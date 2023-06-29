import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Entity } from './Canvas/pongClasses'
import io from "socket.io-client"

const Canvas = (props: any) => {
    
/******************** VARIABLES ********************/

    enum KeyBindings{
        UP = 38,
        DOWN = 40
    }

    let socket: any;
    let counter: number = 0;
    let opponentPoints: number;
    let master: boolean;
    let players: any[] = [];
    let keysPressed: boolean[] = [];
    let playerScore: number = 0;
    let opponentScore: number = 0;
    let player: Paddle | undefined;
    let ball!: Ball;
    let gameCanvas: any;
    let gameContext: any;
    let gameOn: Boolean = false;

/******************** CLASSES ********************/

    class Paddle extends Entity{
    
        private speed:number = 10;
        
        constructor(w:number, h:number, x:number, y:number){
            super(w,h,x,y);
        }
        
        update(canvas: any){
         if( keysPressed[KeyBindings.UP] ) {
            this.yVel = -1;
            if(this.y <= 20){
                this.yVel = 0
            }
         } else if(keysPressed[KeyBindings.DOWN]){
             this.yVel = 1;
             if(this.y + this.height >= canvas.height - 20){
                 this.yVel = 0;
             }
         } else {
             this.yVel = 0;
         }
         this.y += this.yVel * this.speed;
        }
    }

    class Ball extends Entity {
    
        private speed:number = 3;
        
        constructor(w:number, h:number, x:number, y:number){
            super(w,h,x,y);
            var randomDirection = Math.floor(Math.random() * 2) + 1; 
            if(randomDirection % 2) {
                this.xVel = 1;
            } else {
                this.xVel = -1;
            }
            this.yVel = 1;
        }
        
        update(player:Paddle, canvas: any){
           
            //check top canvas bounds
            if(this.y <= 10){
                this.yVel = 1;
            }
            
            //check bottom canvas bounds
            if(this.y + this.height >= canvas.height - 10){
                this.yVel = -1;
            }
            
            if (master) {

                //check left canvas bounds
                if(this.x <= 0){  
                    this.x = canvas.width / 2 - this.width / 2;
                    opponentScore += 1;
                }
                
                //check right canvas bounds
                if(this.x + this.width >= canvas.width){
                    this.x = canvas.width / 2 - this.width / 2;
                    playerScore += 1;
                }
            } else {
                 //check left canvas bounds
                 if(this.x <= 0){  
                    this.x = canvas.width / 2 - this.width / 2;
                    playerScore += 1;
                }
                    
                //check right canvas bounds
                if(this.x + this.width >= canvas.width){
                    this.x = canvas.width / 2 - this.width / 2;
                    opponentScore += 1;
                }
            }
            
            
            //check player collision
            if (master === true) {
                if (this.x <= player.x + player.width)
                    if(this.y >= player.y && this.y + this.height <= player.y + player.height)
                        this.xVel = 1;
                
            } else {
                if (this.x >= player.x - player.width)
                    if(this.y >= player.y && this.y + this.height <= player.y + player.height)
                        this.xVel = -1;
            }
           
            this.x += this.xVel * this.speed;
            this.y += this.yVel * this.speed;
        }
    }

/******************** GAME ********************/



    function setUpGame(gameCanvasRef: any) {

        gameCanvas = gameCanvasRef.current;
        gameContext = gameCanvas.getContext("2d");
        gameContext.font = "30px Orbitron";
        
        var paddleWidth: number = 20, paddleHeight: number = 60, ballSize:number = 10, wallOffset: number = 20;
        ball = new Ball(ballSize, ballSize, gameCanvas?.width / 2 - ballSize / 2, gameCanvas.height / 2 - ballSize / 2);    
        
        socket.on('getCounter', function(data: number) {
            counter = data;
            console.log("counter: ", counter);
            
            if (player === undefined) {

                if (counter === 1) {
                    player = new Paddle(paddleWidth, paddleHeight, wallOffset, gameCanvas.height / 2 - paddleHeight / 2);
                    master = true;
                    console.log("instanciate Player left : ", player);

                } else if (counter === 2) {
                    player = new Paddle(paddleWidth, paddleHeight, gameCanvas.width - (wallOffset + paddleWidth), gameCanvas.height / 2 - paddleHeight / 2); 
                    master = false;
                    console.log("instanciate Player rigth: ", player);
                }
            }
            if (player !== undefined) {
                let infosPlayer = {
                    x:player.x,
                    y:player.y,
                    w:player.width,
                    h:player.height,
                    // v:player.v,
                    // p:player.p
                };
                socket.emit('start', infosPlayer);

                let infosBall = {
                    x:ball.x,
                    y:ball.y,
                    xv:ball.xVel,
                    yv:ball.yVel,
                    // r:ball.r
                };
                socket.emit('startBall', infosBall);
            }
            if (counter >= 2) {
                gameOn = true;
            }
        });
        
    }


    function drawBoardDetails(){
        
        //draw court outline
        gameContext.strokeStyle = "#fff";
        gameContext.lineWidth = 5;
        gameContext.strokeRect(10,10, gameCanvas.width - 20 , gameCanvas.height - 20);
        
        //draw center lines
        for (var i = 0; i + 30 < gameCanvas.height; i += 30) {
            gameContext.fillStyle = "#fff";
            gameContext.fillRect(gameCanvas.width / 2 - 10, i + 10, 15, 20);
        }
        
        //draw scores
        gameContext.fillText(playerScore, 25, 50);
        gameContext.fillText(opponentScore, 755, 50);
        
    }

    function update(){
        socket.on('heartBeat', function(data: any[]){
            players = data;
        });

        socket.on('heartBeatBall', function(data: any){
            if (data !== null) {
                ball.x = data.x;
                ball.y = data.y;
                ball.xVel = data.xVel;
                ball.yVel = data.yVel;
                // ball.r = data.r;
            }
        });
        
        if (player !== undefined) {
            player.update(gameCanvas);
            ball.update(player, gameCanvas);
            
            let updateInfoPlayer = {
            x:player.x,
            y:player.y,
            w:player.width,
            h:player.height,
            // v:player.v,
            // p:player.p
            };
            socket.emit('update', updateInfoPlayer);

            let updateInfoBall = {
                x:ball.x,
                y:ball.y,
                xVel:ball.xVel,
                yVel:ball.yVel,
                // r:ball.r
            };
            socket.emit('updateBall', updateInfoBall);
        }
    }
    
    function draw() {
        gameContext.fillStyle = "#000";
        gameContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
        gameContext.fillRect(33, 33, gameCanvas.width, gameCanvas.height);
        drawBoardDetails();

        if (player !== undefined && ball !== undefined) {
            player.draw(gameContext);
            ball.draw(gameContext);
        }
        drawOpponent(gameContext);
    }

    function drawOpponent (gameContext: any) {
        if (players.length === 2 && player !== undefined) {
            let i = master === true  ? 1 : 0;
            gameContext.fillStyle = "#fff";
            gameContext.fillRect(players[i].x, players[i].y, players[i].width, players[i].height);
        }
    }

    function gameLoop(): any {
        if (counter == 2) {   
            update();
        }
        draw();
        requestAnimationFrame(gameLoop);
    }

    const gameCanvasRef = useRef<HTMLCanvasElement>(null);
    socket = io('http://localhost:8080/pong');

    useEffect(() => {
        const initializeGame = () => {
            if (gameCanvasRef.current) {
                gameCanvasRef.current.width = 800;
                gameCanvasRef.current.height = 600;
                // var game = new Game(gameCanvasRef);
                setUpGame(gameCanvasRef);
                requestAnimationFrame(gameLoop);
            }
        }
        initializeGame();


        
        const keydownHandler = (e: any) => {
            keysPressed[e.which] = true;
        };
    
        const keyupHandler = (e: any) => {
            keysPressed[e.which] = false;
        };
    
        window.addEventListener("keydown", keydownHandler);
        window.addEventListener("keyup", keyupHandler);

        return () => {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
        };

    }, [])
    return <canvas ref={gameCanvasRef} {...props} />;
}

export default Canvas;
