import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

/******************** VARIABLES ******************/

let connections: number = 0;
let players = [];
let b;
let interval = 33;

function Player(id, x, y, v, w, h, p){
    this.id = id;
    this.x = x;
    this.y = y;
    this.v = v;
    this.w = w;
    this.h = h;
    this.p = p;
}

function Ball(id, x, y, xv, yv,r){
    this.id = id;
    this.x = x;
    this.y = y;
    this.xv = xv;
    this.yv = yv;
    this.r = r;
}

/*********************** SERVER SOCKET ***********************/

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class SocketEvents {
    @WebSocketServer()
    server: Server;

    //connexion
    handleConnection(client: Socket) {
        console.log('client connected: ', client.id);
        connections++;
        this.getCounter();
        this.server.on("start", function(data){
            console.log("A user just connected: " + data.id + "; connexion number: " + connections);
            let p = new Player(client.id, data.x, data.y, data.v, data.w, data.h, data.p);
            players.push();
        })

        this.server.on("startBall", function(data) {
            b = new Ball(client.id, data.x, data.y, data.xv, data.yv, data.r);
        })

        this.server.on('update', function(data) {
            var pl;
            for (var i = 0; i < players.length; i++) {
                if (client.id === players[i].id)
                    pl = players[i];
            }
            pl.x = data.x;
            pl.y = data.y;
            pl.v = data.v;
            pl.w = data.w;
            pl.h = data.h;
            pl.p = data.p;
        })

        this.server.on('updateBall', function(data) {
            b.x = data.x;
            b.y = data.y;
            b.xv = data.xv;
            b.yv = data.yv;
            b.r = data.r;
        })
    }

    //deconnexion
    handleDisconnection(client: Socket) {
        console.log('client disconnected: ', client.id);
        connections--;
    }

    getCounter() {
        this.server.emit('getCounter', connections);
    }

    
    heartBeat() {
        this.server.emit('heartBeat', players);
    }
    
    // setInterval(heartBeat, interval);

    heartBeatBall() {
        this.server.emit('heartBeatBall', b);
    }

    // setInterval(heartBeatBall, 33);
}

















// recevoir un event (s'abonner à un message)
/*     @SubscribeMessage('message')
handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    // envoyer un event
    this.server.emit('message', client.id, data);
} */