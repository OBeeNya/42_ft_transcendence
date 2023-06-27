import { useNavigate } from "react-router-dom";
import Content from "../../components/content"
import Header from "../../components/header"
import { useEffect, useState, useRef } from "react";
import { UserInfos } from "../../services/interfaces/userInfos.interface";
import { ax } from "../../services/axios/axios";
import io from "socket.io-client"
// import { Helmet } from "react-helmet";

const Canvas = (props: any) => {

/******************** VARIABLES ********************/

  let socket: any;
  let width = 0,
  height = 0,
  player_width = 0,
  player_height = 0,
  end_point = 0;
  const pi = Math.PI;
  const UP = 38,
  DOWN = 40;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let ctxRef: any = null;

  let keystate: any;
  let ball: any;
  let message = "";
  let score1 = 0, score2 = 0;
  let username: string[] = [];
  let space_down = false;

/******************** PLAYER CLASS ********************/

let players: any[] = [];
class player {
        x: number;
        y: number;
        width: number;
        height: number;
        username: string;
    
        constructor(xpos = 0, ypos = 0) {
          this.x = xpos;
          this.y = ypos;
          this.width = 0;
          this.height = 0;
          this.username = "";
        }
    
        init() {}
    
        update() {
          this.width = player_width;
          this.height = player_height;
        }
    
        draw() {
          const ctx = ctxRef.current;
          if (ctx) {
            ctx.fillRect(this.x, this.y, this.width, this.height);
          }
        }
      }

/******************** BALL CLASS ********************/

    ball = {
      x: null,
      y: null,
      vel: null,
      side: 0,
      speed: 8,
      update: function () {},
  
      draw: function () {
        const ctx = ctxRef.current;
        if (ctx) {
          ctx.fillRect(this.x, this.y, this.side, this.side);
        }
      }
    };

/******************** FUNCTIONS ********************/

    function init() {
      ball.side = player_width;
      ball.x = (width - ball.side) / 2;
      ball.y = (height - ball.side) / 2;
      console.log("player_width", player_width);
      ball.vel = {
        x: ball.speed,
        y: 0
      };
    }
  
    function update() {
      ball.update();
      // console.log("Update: players.length", players.length);

      for (let p in players) {
        players[p].update();
      }
    }

    const draw = (ctx: any) => {

// console.log("test draw")

      ctx.fillRect(0, 0, width, height);
      ctx.save();
      ctx.fillStyle = "#fff";

      // console.log("test draw");


      for(let p = 0; p < players.length; p++){
        players[p].draw();
      }

      ball.draw();

      let mid_width = 4;
      let x = (width - mid_width) * 0.5;
      let y = 0;
      let step = height / 20;

      // draw half line
      while (y < height) {
        ctx.fillRect(x, y + step * 0.25, mid_width, step * 0.5);
        y += step;
      }

      // Messages
      ctx.font = "30px Arial";
      ctx.fillText(message, 0, height - 50);
      // Scores
      ctx.font = "50px Arial"
      ctx.fillText(score1, width/4, height / 5)
      ctx.fillText(score2, 3 * width / 4, height / 5)
      // Usernames : Todo : center usernames
      ctx.font = "30px Arial"
      ctx.fillText(username[0], width/4, height / 8)
      ctx.fillText(username[1], 3 * width / 4, height / 8)

      ctx.restore();
    }

    function main(canvas: any, ctx: any) {
      document.body.appendChild(canvas);

      let loop = function() {
          canvas.width = width;
          canvas.height = height;
          update();
          draw(ctx);
          // window.requestAnimationFrame(loop, canvas);
          window.requestAnimationFrame(loop);
      }
      // window.requestAnimationFrame(loop, canvas);
      window.requestAnimationFrame(loop);
  }

  useEffect(() => {
    console.log("test game 2");

    socket = io("http://localhost:8080/gamePong2");
    socket.on("connect", () => console.log("connected"));

    const canvas = canvasRef.current;
    if (canvas) {
      ctxRef = canvas.getContext('2d');
    }

    main(canvas, ctxRef);
    socket.on('config', (config: any) => {
      width         = config.screen_width;
      height        = config.screen_height;
      player_width  = config.player_width;
      player_height = config.player_height;
      end_point     = config.end_point;
      init();
    })

    socket.on('usernames', (usernames: string) => {
      username.push(usernames[0]);
      username.push(usernames[1]);
    })

    // update game info
    socket.on('update', (ids: number, player_status: any[], ball_status: any) => {
      console.log('update');
      players = [];
      for (let id = 0; id < ids; id++) {
          if(players[id] == null || players[id] == undefined) { 
              players[id] = new player(player_status[id].x, player_status[id].y);
          } 
          else {
              players[id].x = player_status[id].x;
              players[id].y = player_status[id].y;
          }
      }
      ball.x = ball_status.x
      ball.y = ball_status.y
  });
    

  }, [main])

  return (
    <div>
        <canvas ref={canvasRef} {...props}/>
    </div>
  );

}

export default Canvas;




























































// const PongPage2 = () => {
//     let socket: any;
//     let width = 0,
//       height = 0,
//       player_width = 0,
//       player_height = 0,
//       end_point = 0;
//       const pi = Math.PI;
//       const UP = 38,
//       DOWN = 40;
  
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  
//     let keystate: any;
//     let ball: any;
//     let message = "";
//     let score1 = 0,
//       score2 = 0;
//     let username: string[] = [];
  
//     let space_down = false;
//     socket = io("http://localhost:8080/gamePong2");
//     socket.on("connect", () => console.log("connected"));
  
//     useEffect(() => {
//       socket = io("http://localhost:8080/gamePong2");
//       socket.on("connect", () => console.log("connected"));
  
//       const handleKeyDown = (e: KeyboardEvent) => {
//         socket.emit("keydown", e.keyCode);
//         console.log(e.keyCode);
//         if (e.keyCode === 32) {
//           let space = 0;
//           if (!space_down) {
//             space = 1;
//             space_down = true;
//           } else {
//             space = 0;
//           }
//           socket.emit("space_event", space);
//         }
//       };
  
//       document.body.addEventListener("keydown", handleKeyDown);
  
//       return () => {
//         document.body.removeEventListener("keydown", handleKeyDown);
//         // Clean up resources if needed
//       };
//     }, []);
  
//     useEffect(() => {
//       const canvas = canvasRef.current;
//       const ctx = canvas?.getContext("2d");
//       if (ctx !== undefined )
//         ctxRef.current = ctx;
  
//       if (ctx) {
//         // Your canvas drawing logic here
//         // Use ctx for drawing on the canvas
//         if (canvas) {
//           canvas.width = width;
//           canvas.height = height;
//         }
//       }
//     }, []);
  
//     let players: any[] = [];

// /************** PLAYERS **************/

//     class player {
//       x: number;
//       y: number;
//       width: number;
//       height: number;
//       username: string;
  
//       constructor(xpos = 0, ypos = 0) {
//         this.x = xpos;
//         this.y = ypos;
//         this.width = 0;
//         this.height = 0;
//         this.username = "";
//       }
  
//       init() {}
  
//       update() {
//         this.width = player_width;
//         this.height = player_height;
//       }
  
//       draw() {
//         const ctx = ctxRef.current;
//         if (ctx) {
//           ctx.fillRect(this.x, this.y, this.width, this.height);
//         }
//       }
//     }
  

// /************** BALL **************/


//     ball = {
//       x: null,
//       y: null,
//       vel: null,
//       side: 0,
//       speed: 8,
//       update: function () {},
  
//       draw: function () {
//         const ctx = ctxRef.current;
//         if (ctx) {
//           ctx.fillRect(this.x, this.y, this.side, this.side);
//         }
//       }
//     };
  
// /**************  **************/


//     function init() {
//       ball.side = player_width;
//       ball.x = (width - ball.side) / 2;
//       ball.y = (height - ball.side) / 2;
//       console.log(player_width);
//       ball.vel = {
//         x: ball.speed,
//         y: 0
//       };
//     }
  
//     function update() {
//       ball.update();
//       for (let p in players) {
//         players[p].update();
//       }
//     }
  
//     function draw() {
//       const ctx = ctxRef.current;
//       if (ctx) {
//         ctx.fillRect(0, 0, width, height);
//         ctx.save();
//         ctx.fillStyle = "#fff";
  
//         for (let p in players) {
//           players[p].draw();
//         }
  
//         ball.draw();
  
//         var mid_width = 4;
//         var x = (width - mid_width) * 0.5;
//         var y = 0;
//         var step = height / 20;
  
//         // draw half line
//         while (y < height) {
//           ctx.fillRect(x, y + step * 0.25, mid_width, step * 0.5);
//           y += step;
//         }
  
//         // Messages
//         ctx.font = "30px Arial";
//         ctx.fillText(message, 0, height - 50);
//         // Scores
//         ctx.font = "50px Arial";
//         ctx.fillText(score1.toString(), width / 4, height / 5);
//         ctx.fillText(score2.toString(), (3 * width) / 4, height / 5);
//         // Usernames : Todo : center usernames
//         ctx.font = "30px Arial";
//         ctx.fillText(username[0], width / 4, height / 8);
//         ctx.fillText(username[1], (3 * width) / 4, height / 8);
  
//         ctx.restore();
//       }
//     }
  
//     useEffect(() => {
//       if (canvasRef.current) {
//         width = canvasRef.current.clientWidth;
//         height = canvasRef.current.clientHeight;
//         player_width = width * 0.02;
//         player_height = height * 0.2;
  
//         init();
//       }
//     }, []);
  
//     useEffect(() => {
//       const ctx = ctxRef.current;
  
//       if (ctx) {
//         const loop = () => {
//           update();
//           draw();
//           window.requestAnimationFrame(loop);
//         };
  
//         window.requestAnimationFrame(loop);
//       }
//     }, []);
  
//     socket.on("config", (config: any) => {
//       width = config.screen_width;
//       height = config.screen_height;
//       player_width = config.player_width;
//       player_height = config.player_height;
//       end_point = config.end_point;
//       init();
//     });
  
//     socket.on("usernames", (usernames: string) => {
//       username.push(usernames[0]);
//       username.push(usernames[1]);
//     });
  
//     socket.on("game_over", (msg: string) => {
//       message = msg;
//       // Create the button
//       let leave_button = document.createElement("button");
//       leave_button.innerHTML = "Go Back To Menu";
  
//       // Append somewhere
//       let body = document.getElementsByTagName("body")[0];
//       body.appendChild(leave_button);
  
//       // Add event handler
//       leave_button.addEventListener("click", function () {
//         window.location.href = "/";
//       });
//     });
  
//     socket.on("score", (score_user: string) => {
//       console.log(score_user);
//       if (score_user == "ST_RIGHTBALL") {
//         score1 += 1;
//       } else if (score_user == "ST_LEFTBALL") {
//         score2 += 1;
//       }
//     });
  
//     // update game info
//     socket.on("update", (ids: any[], player_status: any, ball_status: any) => {
//       console.log("update");
//       players = [];
//       for (let id of ids) {
//         if (players[id] == null || players[id] == undefined) {
//           players[id] = new player(player_status[id].x, player_status[id].y);
//         } else {
//           players[id].x = player_status[id].x;
//           players[id].y = player_status[id].y;
//         }
//       }
//       ball.x = ball_status.x;
//       ball.y = ball_status.y;
//     });
  
  //   return (
  //     <div>
  //       {/* <Header /> */}
  //       <Content>
  //         {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> */}
  //         <canvas ref={canvasRef}></canvas>
  //         <h1>Pong Game 2</h1>
  //       </Content>
  //     </div>
  //   );
  // };
  
//   export default PongPage2;