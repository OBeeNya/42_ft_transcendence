import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Interval } from '@nestjs/schedule';
import { DirectMessageService } from "./directMessage.service";
import { DirectMessageDto } from "./directMessage.dto";


/******************** VARIABLES ******************/

let connections: number = 0;
let players = [];
let b;
let interval = 20;

function Player(id, x, y, v, w, h, p){
    this.id = id;
    this.x = x;
    this.y = y;
    this.v = v;
    this.w = w;
    this.h = h;
    this.p = p;
}

function Ball(id, x, y, xv, yv, r){
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

	private userSocketMap = new Map<number, string>();

	constructor(private directMessageService: DirectMessageService) {}

    @WebSocketServer()
    server: Server;

    //connexion
    handleConnection(client: Socket) {
        console.log('client connected: ', client.id);
        connections++;
        this.getCounter();
        client.on("start", (data) => {
            console.log("A user just connected: " + client.id + "; connexion number: " + connections);
            if (players.length > 0 && players[players.length - 1].id === client.id) {
                return;
            }
            if (players.length <= 2) {
                let p = new Player(client.id, data.x, data.y, data.v, data.w, data.h, data.p);
                players.push(p);
            }
        })

        client.on("startBall", function(data) {
            b = new Ball(client.id, data.x, data.y, data.xv, data.yv, data.r);
        })

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
                pl.p = data.p;
            }
        })

        client.on('updateBall', function(data) {
            b.x = data.x;
            b.y = data.y;
            b.xv = data.xv;
            b.yv = data.yv;
            b.r = data.r;
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

    afterInit() {
        this.startHeartbeat();
        this.startBallHeartbeat();
    }
    
    //deconnexion
    handleDisconnect(client: Socket) {
        console.log('client disconnected: ', client.id);
        connections = 0;
        players = [];
    }

    /*** CHAT ***/

    @SubscribeMessage('userConnected')
	handleUserConnected(@MessageBody() userId: number, @ConnectedSocket() client: Socket)
	{
		this.userSocketMap.set(userId, client.id);
		console.log(`User ${userId} connected with socket id ${client.id}`);
	}

	@SubscribeMessage('privateMessage')
	async handlePrivateMessage(@MessageBody() data: DirectMessageDto, @ConnectedSocket() client: Socket)
	{
		try
		{
			const newMessage = await this.directMessageService.create(data);
			console.log('Emitting privateMessage with data:', newMessage);

			const receiverSocketId = this.userSocketMap.get(data.receiverId);

			if (receiverSocketId)
				this.server.to(receiverSocketId).emit('privateMessage', newMessage);

			this.server.to(data.receiverId.toString()).emit('privateMessage', newMessage);
			client.emit('privateMessage', newMessage);
		}
		catch (error)
		{
			console.error('Error while handling private message:', error);
			client.emit('error', {message: 'There was an error sending your message.', error: error.message});
		}
	}

	@SubscribeMessage('getConversation')
	async handleGetConversation(@MessageBody() data: {senderId: number, receiverId: number},
								@ConnectedSocket() client: Socket)
	{
		try
		{
			const messages = await this.directMessageService.getConversation(data.senderId, data.receiverId);
			client.emit('conversation', messages);
		}
		catch (error)
		{
			console.error('Error while getting conversation:', error);
			client.emit('error', {message: 'There was an error getting your conversation.', error: error.message});
		}
	}

}
