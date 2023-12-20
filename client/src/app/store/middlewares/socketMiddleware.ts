import { Middleware } from "@reduxjs/toolkit";
import { Socket, io } from "socket.io-client";
import { boardActions } from "../../../entries/Board/slice/boardSlice";
import { Server } from "../../config";
import { socketActions } from "../../../entries/Socket/slice/socketSlice";


const socketMiddleware:Middleware = store =>{
    let socket:Socket
    return next => action =>{
        const connectionEstablished = socket && store.getState().board.isConnected

        if(socketActions.startConnecting.match(action)){
            socket = io(Server.LOCAL_SERVER)
        }
    }
} 

export default socketMiddleware