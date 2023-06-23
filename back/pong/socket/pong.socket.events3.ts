import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Lobby } from './pong2/lobby';
import { RoomManager } from './pong2/room_manager';

/******************** VARIABLES ******************/

let lobby = new Lobby();
let connections: number = 0;
let username = "default";
let room_code = "";
// let room_manager: RoomManager;

/*********************** SERVER SOCKET ***********************/


@WebSocketGateway({
    namespace: 'gamePong2',
    cors: {
        origin: '*',
    },
})
export class SocketEvents3 {

    @WebSocketServer()
    server: Server;

    room_manager: RoomManager;

    afterInit(server: Server) {
        this.room_manager = new RoomManager(server);
      }



    //connexion
    handleConnection(client: Socket) {
        connections++;
        console.log(client.id + " joined game" + "; connexion number: " + connections);
        lobby.add_player(client.id, username, room_code);

        if(lobby.get_num_player() % 2 == 0 && lobby.get_num_player() > 0) {
            let player1 = lobby.public_queue.shift();
            let player2 = lobby.public_queue.shift();
            this.room_manager.create_room(player1, player2);
        }
        if(lobby.get_num_private_players(room_code) == 2) {
            let player1 = lobby.private_players[room_code].shift();
            let player2 = lobby.private_players[room_code].shift();
            this.room_manager.create_room(player1, player2);
        }


        client.on('keydown', (keycode) => {
            if (this.room_manager.num_rooms > 0) {
                let user = this.room_manager.find_user(client.id);
                if (user != null) {
                    if(keycode != 32) {
                        this.room_manager.find_user(client.id).keypress[keycode] = true;
                    }
                }
            }
        });

        client.on('keyup', (keycode) => {
            if (this.room_manager.num_rooms > 0) {
                let user = this.room_manager.find_user(client.id);
                if (user != null) {
                    this.room_manager.find_user(client.id).keypress[keycode] = false;
                }
            }
        });

        client.on('space_event', (space) => {
            if (this.room_manager.num_rooms > 0) {
                let user = this.room_manager.find_user(client.id);
                const SPACE = 32;
                if (user != null) {
                    if(space == 1) {
                        this.room_manager.find_user(client.id).keypress[SPACE] = true;
                    } else if(space == 0) {
                        this.room_manager.find_user(client.id).keypress[SPACE] = false;
                    }
                }
            }
        })

    }

    //deconnexion
    handleDisconnect(client: Socket) {
        connections--;
        console.log('client disconnected: ', client.id + "; connexion number: " + connections);
    //     const room = this.room_manager.find_room(client.id);
    //     if(room != null) {
    //         room.disconnect(client.id);
    //     }
    //     if(room_codes[room_code] != null) {
    //         delete room_codes[room_code];
    //         delete lobby.private_players[room_code];
    //     }
    //     lobby.remove_player(client.id);
    }

}



