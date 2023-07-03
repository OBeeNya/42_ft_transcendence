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
var SocketEvents_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEvents = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
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
let SocketEvents = SocketEvents_1 = class SocketEvents {
    constructor() {
        this.connections = 0;
        this.instancesPerConnection = 2;
        this.initialized = false;
    }
    initializeGateway() {
        this.initialized = true;
    }
    handleConnection(client) {
        this.connections++;
        this.getCounter();
        console.log('THIS.INITIALIZED: ' + this.initialized);
        if (this.initialized === true && this.connections % this.instancesPerConnection === 1) {
            console.log('here in handleConnection');
            const newServer = new SocketEvents_1();
            newServer.initializeGateway();
            newServer.afterInit(this.server);
        }
        console.log('AFTER CHECK');
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
        this.server.emit('getCounter', this.connections);
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
    afterInit(server) {
        console.log('AFTER INIT CALLED');
        this.startHeartbeat();
        this.startBallHeartbeat();
        this.startScoreHeartbeat();
    }
    handleDisconnect() {
        this.connections--;
        players = [];
        scores = [0, 0];
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketEvents.prototype, "server", void 0);
SocketEvents = SocketEvents_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'pong',
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [])
], SocketEvents);
exports.SocketEvents = SocketEvents;
//# sourceMappingURL=pong.socket.events.js.map