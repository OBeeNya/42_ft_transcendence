import { Injectable } from '@nestjs/common';

@Injectable()
export class Player {

    to_trans: any;
    points: number;
    username: string;
    id: number;
    keypress: any;
    keyonce:any;
    width: number;
    height: number;

    constructor(info, xpos = 0, ypos = 0) {
        this.to_trans = {};
        this.to_trans.x = xpos;
        this.to_trans.y = ypos;
        this.points = 0;

        this.username = info.username;
        this.id = info.id;
        this.keypress = [];
        this.keyonce = [];
        
        // HARD-CODED
        this.width = 20;
        this.height = 100
    }
};
