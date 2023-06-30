import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

/******************** VARIABLES ******************/

let connections: number = 0;
let players = [];
let b;
let interval = 10;
// let masterScore = 0;
// let slaveScore = 0;
let scores: number[] = [0, 0];

function Player(id, x, y, v, w, h, p) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.v = v;
    this.w = w;
    this.h = h;
    // this.p = p;
}

function Ball(id, x, y, xv, yv, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.xv = xv;
    this.yv = yv;
    this.r = r;
}

/*********************** SERVER SOCKET ***********************/

@WebSocketGateway({
    namespace: 'pong',
    cors: {
        origin: '*',
    },
})
export class SocketEvents {

    @WebSocketServer()
    server: Server;

    //connexion
    handleConnection(client: Socket) {
        // console.log('client.id: ', client.id);
        connections++;
        this.getCounter();
        client.on("start", (data) => {
            // console.log("A user just connected: " + client.id + "; connexion number: " + connections);
            if (players.length > 0 && players[players.length - 1].id === client.id)
                return;
            if (players.length < 2) {
                let p = new Player(client.id, data.x, data.y, data.v, data.w, data.h, data.p);
                players.push(p);
            }
        });

        client.on("startBall", function(data) {
            b = new Ball(client.id, data.x, data.y, data.xv, data.yv, data.r);
        });

        client.on('update', function(data) {
            let pl;
            for (let i = 0; i < players.length; i++) {
                if (client.id === players[i].id)
                    pl = players[i];
            }
            if (pl !== undefined) {
                pl.x = data.x;
                pl.y = data.y;
                pl.v = data.v;
                pl.w = data.w;
                pl.h = data.h;
                // pl.p = data.p;
            }
        });

        client.on('updateBall', function(data) {
            b.x = data.x;
            b.y = data.y;
            b.xv = data.xv;
            b.yv = data.yv;
            b.r = data.r;
        })

        client.on('updateScoreMaster', function(data) {
            // console.log("score master: ", data);
            data++;
            scores[0] = data;
            // console.log("score master 2: ", data);
        })

        client.on('updateScoreSlave', function(data) {
            // console.log("score slave: ", data);
            data++;
            scores[1] = data;
            // console.log("score slave2: ", data);
        })
    }

    getCounter() {
        this.server.emit('getCounter', connections);
    }

    heartBeat() {
        this.server.emit('heartBeat', players);
    }

    heartBeatBall() {
        this.server.emit('heartBeatBall', b); 
    }

    heartBeatScore() {
        this.server.emit('heartBeatScore', scores); 
    }

    startHeartbeat() {
        setInterval(() => {
          this.heartBeat();
        }, interval);
    }

    startBallHeartbeat() {
        setInterval(() => {
            this.heartBeatBall();
        }, interval);
    }

    startScoreHeartbeat() {
        setInterval(() => {
            this.heartBeatScore();
        }, interval);
    }

    afterInit() {
        this.startHeartbeat();
        this.startBallHeartbeat();
        this.startScoreHeartbeat();
    }

    //deconnexion
    // handleDisconnect(client: Socket) {
    handleDisconnect() {
        connections--;
        players = [];
        scores = [0, 0];
        // console.log('client disconnected: ', client.id + "; connexion number: " + connections);
    }

}
