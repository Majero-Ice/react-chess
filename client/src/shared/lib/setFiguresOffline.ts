import { Board,Color,Bishop,King,Knight,Pawn,Queen,Rook } from "../../entities"


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
