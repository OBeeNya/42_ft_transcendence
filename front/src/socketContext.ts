import { createContext } from "react";
import { Socket } from "socket.io-client";

// context pour éviter de passer manuellement les props à chaque composant
// ayant besoin d'une interaction avec les websockets
export const SocketContext = createContext<Socket | null>(null);
