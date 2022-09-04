import {Color} from "./models/Color";
import {Board} from "./models/Board";
import {Cell} from "./models/Cell";
import {FigureName} from "./models/FigureName";

export  const connection = (socket:WebSocket,playerColor:Color | null,playerName:string,board:Board,socketId:string = '') =>{
        socket.send(JSON.stringify({
            socketId,
            playerName:playerName ? playerName : 'Player',
            playerColor,
            playerId:board.playerId,
            method: 'connection'
    }))
}

export const waitForOpponent = (socket:WebSocket,socketId:string = '',loader:boolean,user:string) =>{
    socket.send(JSON.stringify({
        socketId,
        loader:loader,
        user,
        method:'waitForOpponent'
    }))
}

export const changeColorHandler = (socket:WebSocket,socketId:string = '',currentPlayer:Color) =>{
    socket?.send(JSON.stringify({
        socketId,
        currentPlayer,
        method: 'changeColor'
    }))
}

export  const checkHandler = (socket:WebSocket | null,socketId:string = '') =>{
    socket?.send(JSON.stringify({
        socketId,
        method:'check'
    }))
}


export const updateBoard = (board:Board) =>{
    const newBoard = board.getCopyBoard(board.socket)
    return newBoard

}

export const highlightCell = (board:Board,selected:Cell | null,isCheck:boolean) =>{
    if (isCheck && selected && selected.figure?.protector && selected.figure?.name !== FigureName.KING){
        board.checkHighlightedCells(selected)

    }else{
        board.highlightedCells(selected)
    }
    return updateBoard(board)
}

export const restartHandler = (socket:WebSocket | null,socketId:string = '') =>{
    socket?.send(JSON.stringify({
        socketId,
        method:'restart'
    }))
}


export const changeCurrentPlayer = (currentPlayer:Color) =>{
    return currentPlayer === Color.WHITE ? Color.BLACK : Color.WHITE
}

export const endGameHandler = (socket:WebSocket | null,sessionId:string = '') =>{
    socket?.send(JSON.stringify({
        sessionId,
        method:'endGame'
    }))

}