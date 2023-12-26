import { Middleware } from "@reduxjs/toolkit";
import { Socket, io } from "socket.io-client";
import { Server } from "../../config";
import { socketActions } from "../../../entries/Socket/slice/socketSlice";
import { figureActions } from "../../../entries/Figures/slice/figureSlice";
import { playerActions } from "../../../entries/Player/slice/playerSlice";
import { Player } from "../../../entries/Player/Player";
import { changeColor, getFigureClass } from "../../../shared/lib/board";
import { Figure } from "../../../entries/Figures/Figure";
import { boardActions } from "../../../entries/Board/slice/boardSlice";


const socketMiddleware:Middleware = store =>{
    let socket:Socket
    return next => action =>{
        const boardSlice = store.getState().boardSlice
        const playerSlice = store.getState().playerSlice
        const figureSlice = store.getState().figureSlice
        const connectionEstablished = socket && boardSlice.isConnected

        if(socketActions.startConnecting.match(action)){
            socket = io(Server.LOCAL_SERVER)
        }
        socket.on('onJoin',(usersAmount:number) =>{
            if(playerSlice.opponent && usersAmount === 2){
                store.dispatch(boardActions.setLoading(false))
            }
        })
        socket.on('onOpponent',({_id,lostFigures,username,color}:Player) =>{
            const figures = lostFigures.map(figure => getFigureClass(figure,boardSlice.board))
            const opponent = new Player(username,color,_id,figures)
            localStorage.setItem('opponentId',opponent._id)
            store.dispatch(playerActions.setOpponent(opponent))
            store.dispatch(boardActions.setLoading(false))
        })
        socket.on('onAddPlayer',({username,color,_id,lostFigures}:Player) =>{
            const figures = lostFigures.map(figure => getFigureClass(figure,boardSlice.board))
            const user = new Player(username,color,_id,figures)
            localStorage.setItem('userId',user._id)
            store.dispatch(playerActions.setUser(user))
        })
         socket.on('onMove',({x,y,id}:any) =>{
            store.dispatch(figureActions.moveFigure({id,x,y}))
            store.dispatch(playerActions.setCurrentPlayer(changeColor(playerSlice.currentPlayer)))
            localStorage.setItem('currentPlayer',changeColor(playerSlice.currentPlayer))
        })
        if(figureActions.removeFigure.match(action) && connectionEstablished){
            const figure = figureSlice.figures.find((figure:Figure) => figure._id === action.payload.figureId)
            store.dispatch(playerActions.addLostFigure({isUser:playerSlice.user.color === figure.color,figure}))
            socket.emit('add-figure',action.payload)
        }
        if(figureActions.moveFigure.match(action) && connectionEstablished){
            socket.emit('move',action.payload)
        }
        if(playerActions.joinPlayer.match(action) && connectionEstablished){
            socket.emit('join-player',playerSlice.playersAmount)
        }
        next(action)
    }
} 

export default socketMiddleware