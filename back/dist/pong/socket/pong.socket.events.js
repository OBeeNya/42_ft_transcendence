"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEvents = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let connections = 0;
let players = [];
let b;
let interval = 10;
let scores = [0, 0];
function Player(id, x, y, v, w, h, p) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.v = v;
    this.w = w;
    this.h = h;
}
function Ball(id, x, y, xv, yv, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.xv = xv;
    this.yv = yv;
    this.r = r;
}
let SocketEvents = class SocketEvents {
    handleConnection(client) {
        connections++;
        this.getCounter();
        client.on("start", (data) => {
            if (players.length > 0 && players[players.length - 1].id === client.id)
                return;
            if (players.length < 2) {
                let p = new Player(client.id, data.x, data.y, data.v, data.w, data.h, data.p);
                players.push(p);
            }
        });
        client.on("startBall", function (data) {
            b = new Ball(client.id, data.x, data.y, data.xv, data.yv, data.r);
        });
        client.on('update', function (data) {
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
            }
        });
        client.on('updateBall', function (data) {
            b.x = data.x;
            b.y = data.y;
            b.xv = data.xv;
            b.yv = data.yv;
            b.r = data.r;
        });
        client.on('updateScoreMaster', function (data) {
            data++;
            scores[0] = data;
        });
        client.on('updateScoreSlave', function (data) {
            data++;
            scores[1] = data;
        });
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
    handleDisconnect() {
        connections--;
        players = [];
        scores = [0, 0];
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketEvents.prototype, "server", void 0);
SocketEvents = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'pong',
        cors: {
            origin: '*',
        },
    })
], SocketEvents);
exports.SocketEvents = SocketEvents;
//# sourceMappingURL=pong.socket.events.js.map