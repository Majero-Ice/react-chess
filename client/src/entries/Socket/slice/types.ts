import { Socket } from "socket.io-client";

 

 export interface socketState{
    isConnected: boolean,
    isEstablishingConnection: boolean
 }