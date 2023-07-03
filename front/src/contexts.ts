import { createContext } from "react";
import { Socket } from "socket.io-client";
import { Message } from "./scenes/Chat/ChatBox/ChatBox";
import { ChanMessage } from "./scenes/Chat/ChannelBox/ChannelBox";

export const SocketContext = createContext<Socket | null>(null);
export const MessageContext = createContext<Message[]>([]);
export const ChanMessageContext = createContext<ChanMessage[]>([]);
