import { Middleware } from "@reduxjs/toolkit";
import { Socket, io } from "socket.io-client";
import { boardActions } from "../../../entries/Board/slice/boardSlice";
import { Server } from "../../config";
import { socketActions } from "../../../entries/Socket/slice/socketSlice";
import { figureActions } from "../../../entries/Figures/slice/figureSlice";
import { playerActions } from "../../../entries/Player/slice/playerSlice";
import { Player } from "../../../entries/Player/Player";
import { getFigureClass } from "../../../shared/lib/board";


const socketMiddleware:Middleware = store =>{
    let socket:Socket
    return next => action =>{
        const connectionEstablished = socket && store.getState().boardSlice.isConnected
        if(socketActions.startConnecting.match(action)){
            socket = io(Server.LOCAL_SERVER)
        }
        socket.on('onJoin',() =>{
            store.dispatch(playerActions.joinPlayer()) 
        })
        socket.on('onOpponent',({_id,lostFigures,username,color}:Player) =>{
            const figures = lostFigures.map(figure => getFigureClass(figure,store.getState().boardSlice.board))
            const opponent = new Player(username,color,_id,figures)
            localStorage.setItem('opponentId',opponent._id)
            store.dispatch(playerActions.setOpponent(opponent))
        })
        if(figureActions.removeFigure.match(action)){
            socket.emit('add-figure',action.payload)
        }
        next(action)
    }
} 

export default socketMiddleware