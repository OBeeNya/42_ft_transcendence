import * as React from "react";
import { ReactP5Wrapper, Sketch } from "@p5-wrapper/react";

const sketch: Sketch = p5 => {

/******************** VARIABLES ******************/

    let p: Player;
    let master = false;
    let gameEnded = false;
    let gameStarted = false;
    let counter = 0;
    let opponentPoints = 0;
    let players = [];
    let balls = [];
    let b: Ball;
    let lastPos;
    let socket;


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
        this.v = 4;
        this.w = 20;
        this.h = 80;
        this.p = 0;
    }
    
    show = (): void => {
        // p5.rectMode(p5.CORNERS);
        p5.rect(this.x, this.y, this.w, this.h);
    }

    move = (b: Ball): void => {
        if (this.y < p5.mouseY)
        this.y += this.v;
        else if (this.y > p5.mouseY)
        this.y -= this.v;
    }
}


/******************************** BALL ********************************/

class Ball {
    x: number; 
    y: number; 
    xv: number;  
    yv: number; 

    constructor() {
        this.x = p5.width/2;;
        this.y = p5.height/2;
        let r = p5.floor(p5.random(2));
        this.xv = (r === 0)?-5:5;
        this.yv = 5;
    }

    show(): void{
        p5.ellipse(this.x, this.y, 15, 15);
    }

    move(): void{
        if(this.y < 1)
            this.yv = 5;
        if(this.y >= p5.height)
            this.yv = -5;
        this.y += this.yv;
        this.x += this.xv;
    }

    collision(p: Player){
        var d = p5.dist(this.x, this.y, p.x, p.y);
        var r = p5.floor(p5.random(2));
        if(d < 15 + 20) {
            if(r === 1)
                if(this.y - p.y < 0)
                    this.yv = 5;
                else if(this.y - p.y === 0)
                    this.yv = 0;
                else
                    this.yv = -5;
            return true;
        }
        else
            return false;
    }
}


/******************************** SKETCH ********************************/

    p5.setup = () => {
        p5.createCanvas(750,600);
        b = new Ball();
        p = new Player(0);
        master = true;
    }
    // if(p === undefined) {
    // }

    p5.draw = () => {
        p5.background(0);
        p5.rect(p5.width/2,0,10,600)
        p5.textSize(48);
        p5.fill(0, 102, 153);
        if(gameStarted === false) {
            p5.text("0", 20, 50);
            p5.text("0", 705, 50);
        }
        // if (master === true) {
        //     p5.text(p.p, 20, 40);
        //     p5.text(opponentPoints, 620, 50);
        // } else {
        //     p5.text(p.p, 620, 40);
        //     p5.text(opponentPoints, 20, 50);
        // }
        p.show();
        p.move(b);
        b.show();
        b.move();
        if(b.collision(p) && p.x === 0)
            b.xv = 5;
        // if(b.collision(p) && p.x === p5.width)
        //     b.xv = -5;
        if(b.x < 0){
            if (master === false)
                p.p++;
            else
                opponentPoints++;
            throwBall();
        } 
        if(b.x > p5.width){
            if (master === true)
                p.p++;
            else
                opponentPoints++;
            throwBall();
        }
    };

    function throwBall(){
        if (p.p >= 3 || opponentPoints >= 3)
            gameEnded = true;
        if (gameEnded === true) {
            return;
        }
        b.x = p5.width/2;
        b.y = p5.height/2;
    }



    
};

export function SketchComponent() {
  return <ReactP5Wrapper sketch={sketch} />;
}