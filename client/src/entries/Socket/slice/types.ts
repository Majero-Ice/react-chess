import { Socket } from "socket.io-client";

 

 export interface socketState{
    socket: Socket | null,
    isConnected: boolean,
    isEstablishingConnection: boolean
 }