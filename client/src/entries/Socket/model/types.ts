import { Socket } from "socket.io-client"
import { Player } from "../../Player/Player"


export interface SocketState {
    user:Player | null
    opponent:Player | null
    usersAmount:number 
}

export interface ISocket extends Socket{
    name?:string
}