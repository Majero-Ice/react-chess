import { Board } from "../../entries/Board/Board"
import { Color } from "../../entries/Cell/color"
import { Bishop } from "../../entries/Figures/Bishop"
import { King } from "../../entries/Figures/King"
import { Knight } from "../../entries/Figures/Knight"
import { Pawn } from "../../entries/Figures/Pawn"
import { Queen } from "../../entries/Figures/Queen"
import { Rook } from "../../entries/Figures/Rook"


export const addFigures = (board:Board) =>{
    return [
        ...addQueen(board),
        ...addBishop(board),
        ...addKing(board),
        ...addKnight(board),
        ...addRook(board),
        ...addPawn(board)
    ]    
}



const addPawn = (board:Board) =>{
    const pawns = []
    for(let i = 0; i < 8; i++){
        pawns.push(
            new Pawn('',i,6,Color.WHITE,board),
            new Pawn('',i,1,Color.BLACK,board)
            )
    }
    return pawns
}
const addQueen = (board:Board) =>{
    return [new Queen('',3,7,Color.WHITE,board),
            new Queen('',3,0,Color.BLACK,board)]
}
const addKing = (board:Board) =>{
    return [new King('',4,7,Color.WHITE,board),
            new King('',4,0,Color.BLACK,board)]
}
const addBishop = (board:Board) =>{
    return [new Bishop('',2,7,Color.WHITE,board),
            new Bishop('',5,7,Color.WHITE,board),
            new Bishop('',2,0,Color.BLACK,board),
            new Bishop('',5,0,Color.BLACK,board),]
}
const addRook = (board:Board) =>{
    return [new Rook('',0,7,Color.WHITE,board),
            new Rook('',7,7,Color.WHITE,board),
            new Rook('',7,0,Color.BLACK,board),
            new Rook('',0,0,Color.BLACK,board),]
}
const addKnight = (board:Board) =>{
    return [new Knight('',1,7,Color.WHITE,board),
            new Knight('',6,7,Color.WHITE,board),
            new Knight('',1,0,Color.BLACK,board),
            new Knight('',6,0,Color.BLACK,board),]
}
