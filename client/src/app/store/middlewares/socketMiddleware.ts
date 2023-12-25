import { Middleware } from "@reduxjs/toolkit";
import { Socket, io } from "socket.io-client";
import { Server } from "../../config";
import { socketActions } from "../../../entries/Socket/slice/socketSlice";
import { figureActions } from "../../../entries/Figures/slice/figureSlice";
import { playerActions } from "../../../entries/Player/slice/playerSlice";
import { Player } from "../../../entries/Player/Player";
import { changeColor, getFigureClass } from "../../../shared/lib/board";
import { Figure } from "../../../entries/Figures/Figure";


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
        socket.on('onAddPlayer',({username,color,_id,lostFigures}:Player) =>{
            const figures = lostFigures.map(figure => getFigureClass(figure,store.getState().boardSlice.board))
            const user = new Player(username,color,_id,figures)
            localStorage.setItem('userId',user._id)
            store.dispatch(playerActions.setUser(user))
        })
         socket.on('onMove',({x,y,id}:any) =>{
            const currentPlayer = store.getState().playerSlice.currentPlayer
            store.dispatch(figureActions.moveFigure({id,x,y}))
            store.dispatch(playerActions.setCurrentPlayer(changeColor(currentPlayer)))
            localStorage.setItem('currentPlayer',changeColor(currentPlayer))
        })
        if(figureActions.removeFigure.match(action) && connectionEstablished){
            const figure = store.getState().figureSlice.figures.find((figure:Figure) => figure._id === action.payload.figureId)
            const user = store.getState().playerSlice.user
            store.dispatch(playerActions.addLostFigure({isUser:user.color === figure.color,figure}))
            socket.emit('add-figure',action.payload)
        }
        if(playerActions.addLostFigure.match(action) && connectionEstablished){
            
        }
        next(action)
    }
} 

export default socketMiddleware