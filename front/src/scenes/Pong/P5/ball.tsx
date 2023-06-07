export {}

// export declare class Ball {
//     x: number; 
//     y: number; 
//     r: number; 
//     xv: number;  
//     yv: number; 

//     constructor(x:number) {
//         this.x = width/2;;
//         this.y = height/2;
//         let r = floor(random(2));
//         this.xv = (r === 0)?-5:5;
//         this.yv = 5;
//     }

//     show(): void{
//         ellipse(this.x, this.y, 15, 15);
//     }

//     move(): void{
//         if(this.y < 1)
//             this.yv = 5;
//         if(this.y >= height)
//             this.yv = -5;
//         this.y += this.yv;
//         this.x += this.xv;
//     }

//     collision(p){
//         var d = dist(this.x, this.y, p.x, p.y);
//         var r = floor(random(2));
//         if(d < 15 + 20){
//             if(r === 1)
//                 if(this.y-p.y < 0)
//                     this.yv = 5;
//                 else if(this.y - p.y == 0)
//                     this.yv = 0;
//                 else
//                     this.yv = -5;
//             return true;
//         }
//         else
//             return false;
//     }

// }
