// import * as React from "react";
import { ReactP5Wrapper, Sketch } from "@p5-wrapper/react";
import io from "socket.io-client"

const sketch: Sketch = p5 => {

/******************** VARIABLES ******************/

    let p: Player;
    let master = false;
    let gameOn = false;
    let gameEnded = false;
    // let spectator = false;
    let opponentPoints = 0;
    let players: any[] = [];
    let counter = 0;
    let b: Ball;
    let socket: any;
    let playerSize = 20;
    let playerSpeed = 6;
    let ballSize = 15;
    let ballSpeed = 5;
    let pointsToWin = 5;
    let paused = 1;

/******************************** PLAYER ********************************/

class Player {
    x: number;
    y: number;
    v: number;
    w: number;
    h: number;
    p: number;

    constructor(x:number) {
        this.x = x;
        this.y = p5.height/2;
        this.v = playerSpeed;
        this.w = 20;
        this.h = 80;
        this.p = 0;
    }
    
    show = (): void => {
        p5.rectMode(p5.CENTER);
        p5.rect(this.x, this.y, this.w, this.h);
    }

    move = (): void => {
        if (p5.keyIsPressed) {
            if (p5.keyCode === p5.UP_ARROW) { 
                this.y -= this.v;
            } else if (p5.keyCode === p5.DOWN_ARROW) { 
                this.y += this.v;
            }
          }
    }
}

/******************************** BALL ********************************/

class Ball {
    x: number; 
    y: number; 
    r: number;
    xv: number;  
    yv: number; 

    constructor() {
        this.x = p5.width/2;
        this.y = p5.height/2;
        this.r = p5.floor(p5.random(2));
        this.xv = (this.r === 0)?-ballSpeed:ballSpeed;
        this.yv = ballSpeed;
    }

    show(): void {
        p5.ellipse(this.x, this.y, ballSize, ballSize);
    }

    move(): void {
        if(this.y < 1)
            this.yv = ballSpeed;
        if(this.y >= p5.height)
            this.yv = -ballSpeed;
        this.y += this.yv;
        this.x += this.xv;
    }

    collision(p: Player) {
        let d = p5.dist(this.x, this.y, p.x, p.y);
        if(d < ballSize + playerSize + 2) {
                if(this.y - p.y < 0)
                    this.yv = ballSpeed;
                else
                    this.yv = -ballSpeed;
                // else if(this.y - p.y === 0) {
                //     this.yv = 0;
                // }
                return true;
        }
        else
            return false;
    }
}

/******************************** SKETCH ********************************/

    p5.setup = () => {

        socket = io('http://localhost:8080/pong');

        socket.on('connect', () => console.log("connected"));

        p5.createCanvas(750,600);
        b = new Ball();

        socket.on('getCounter', function(data: number) {
            counter = data;
            // console.log("counter:", counter);
            if(p === undefined) {
                if (counter === 1) {
                    p = new Player(0);
                    master = true;
                } else if (counter === 2){
                    p = new Player(p5.width);
                    master = false;
                }
            } 
            if (p !== undefined) {
                let infosPlayer = {
                    x:p.x,
                    y:p.y,
                    v:p.v,
                    w:p.w,
                    h:p.h,
                    p:p.p
                };
                socket.emit('start', infosPlayer);

                let infosBall = {
                    x:b.x,
                    y:b.y,
                    xv:b.xv,
                    yv:b.yv,
                    r:b.r
                };
                socket.emit('startBall', infosBall);
            }
            if (counter >= 2) {
                gameOn = true;
            }
        });

        socket.on('heartBeat', function(data: any[]){
            players = data;
        });

        socket.on('heartBeatBall', function(data: any){
            if (data !== null) {
                b.x = data.x;
                b.y = data.y;
                b.xv = data.xv;
                b.yv = data.yv;
                b.r = data.r;
            }
        });
    }

    p5.draw = () => {

        p5.noCursor();
        p5.background(0);
        p5.textFont('Courier New');
        p5.fill(0, 102, 153);

        if(gameOn === false) {
            
            p5.textSize(48);
            p5.text("0", 25, 50);
            p5.text("0", 710, 50);

            p5.textAlign(p5.CENTER); 
            p5.textSize(40); 
            p5.text("Waiting for an opponent", p5.width/2, p5.height/2); 
        }
        
        if (gameEnded === true) {
            p5.noLoop();
            showWinner();
        }

        if(gameOn === true && p !== undefined) {
            p5.textSize(48);
            p5.rect(p5.width/2, 0, 5, 1200);
                if (master === true) { 
                    p5.text(p.p, 20, 40);
                    p5.text(opponentPoints, 710, 50);
                } else {
                    p5.text(p.p, 710, 40);
                    p5.text(opponentPoints, 20, 50);
                }
                p.show();
                p.move();
                b.show();
                b.move();
                if (b.collision(p) && p.x === 0)
                    b.xv = ballSpeed;
                if (b.collision(p) && p.x === p5.width)
                    b.xv = -ballSpeed;
                if (b.x === 0) {
                    // console.log("1/ b.x === 0");
                    p5.noLoop();
                    // console.log("2/ b.x === 0");
                    if (master === false)
                        p.p++;
                    else
                        opponentPoints++;
                    throwBall();
                } else if (b.x === p5.width) {
                    // console.log("1/b.x === p5.width");
                    p5.noLoop();
                    // console.log("2/b.x === p5.width");
                    if (master === true)
                        p.p++;
                    else
                        opponentPoints++;
                    throwBall();
                }

            if (players.length === 2 && p !== undefined) {
                let i = master === true  ? 1 : 0;
                p5.fill(255, 0, 0);
                p5.rectMode(p5.CENTER);
                p5.rect(players[i].x, players[i].y, players[i].w, players[i].h);
            }

            let updateInfoPlayer = {
                x:p.x,
                y:p.y,
                v:p.v,
                w:p.w,
                h:p.h,
                p:p.p
            };
            socket.emit('update', updateInfoPlayer);

            let updateInfoBall = {
                x:b.x,
                y:b.y,
                xv:b.xv,
                yv:b.yv,
                r:b.r
            };
            socket.emit('updateBall', updateInfoBall);
        } 
        else if (gameOn === true && p === undefined)
            drawSpectator();

        pauseGame();

    };

    function throwBall() {
        if (p.p >= pointsToWin || opponentPoints >= pointsToWin) {
            gameOn = false;
            gameEnded = true;
        }
        p5.loop();
        b.x = p5.width/2;
        b.y = p5.height/2;
    }

    function showWinner() {
        p5.background(0);
        p5.textFont('Courier New');
        p5.textAlign(p5.CENTER); 
        p5.textSize(80);
        p5.fill(0, 102, 153);
        if (p !== undefined && p.p >= pointsToWin) {
            p5.textFont('Courier New');
            p5.text("You WON!", p5.width/2, p5.height/2); 
            p5.textSize(30);
            p5.text("reloading the page...", p5.width/2, p5.height/2 + 100); 
        } else if (p !== undefined && opponentPoints >= pointsToWin) {
            p5.textFont('Courier New');
            p5.text("You LOST...", p5.width/2, p5.height/2);
            p5.textSize(30);
            p5.text("reloading the page...", p5.width/2, p5.height/2 + 100);
        } else if (p === undefined ) {
            p5.textFont('Courier New');
            p5.text("Match is over!", p5.width/2, p5.height/2);
            p5.textSize(30);
            p5.text("reloading the page...", p5.width/2, p5.height/2 + 100);
        }
        socket.on('disconnect', () => console.log("disconnection front"));
        setTimeout(() => {  window.location.href = "/pong"; }, 5000);
    }

    function drawSpectator() {
        b.show();
        b.move();
        if (players.length === 2) {
            for (let i = 0; i < 2; i++) {
                p5.fill(255,0,0);
                p5.rectMode(p5.CENTER);
                p5.rect(players[i].x, players[i].y, players[i].w, players[i].h);
            }
        } else if (players.length === 0){
            showWinner();
        }
    }

    function pauseGame() {
        if (p5.keyIsPressed) {
            if (p5.keyCode === p5.LEFT_ARROW) {
                if (paused === 1) {
                    b.xv = 0;
                    b.yv = 0;
                }
                else {
                    b.xv = (b.r === 0)?-ballSpeed:ballSpeed;
                    b.yv = ballSpeed;
                }
                paused *= -1;
            }
        }
    }

};

export function SketchComponent() {
  return <ReactP5Wrapper sketch={sketch} />;
}
