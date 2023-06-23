import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

/******************** VARIABLES ******************/

let username = "default";
let room_code = "";
let room_codes = {};
let mode: any = "public";
let connections: number = 0;

/*********************** SERVER SOCKET ***********************/


@WebSocketGateway({
    namespace: 'menuPong2',
    cors: {
        origin: '*',
    },
})
export class SocketEvents2 {

    @WebSocketServer()
    server: Server;

    //connexion
    async handleConnection(client: Socket) {

    connections++;
    console.log(client.id + " joined menu" + "; connexion number: " + connections);
    let validate = 0;
    let message = "";

    let login = new Promise((resolve, reject) => {
        client.on('join_public', (username) => {
            message = "public";
            validate = 1;
            client.emit('public_validation', validate, message);
        });

        // create private
        client.on('create_private', (username, room_code) => {
            if(room_codes[room_code] >= 1) {
                message = room_code + " already exists!";
                reject(message);
            } else {
                room_codes[room_code] = 1;
                validate = 1;
            }
            client.emit('create_validation', validate, message)
        });
        // join private
        client.on('join_private', (username, room_code) => {
            let validate = 0; 
            let message = "";
            if (room_codes[room_code] == null) {
                message = room_code + " does not exist!";
                reject(message);
            }
            else if (room_codes[room_code] == 1) {
                room_codes[room_code]++;
                validate = 1;
            } else if (room_codes[room_code] > 1) {
                message = "Room is full!";
                reject(message);
            }
            client.emit('join_validation', validate, message);
        })
        resolve(message);
    });

    mode = await login;

    }

    //deconnexion
    handleDisconnect(client: Socket) {
        connections--;
        console.log(client.id + " left menu");
        
    }

}



