import { Board } from "../../entries/Board/Board"
import { Cell } from "../../entries/Cell/Cell"
import { Color } from "../../entries/Cell/color"
import { Bishop } from "../../entries/Figures/Bishop"
import { Figure } from "../../entries/Figures/Figure"
import { FigureNames } from "../../entries/Figures/FigureNames"
import { King } from "../../entries/Figures/King"
import { Knight } from "../../entries/Figures/Knight"
import { Pawn } from "../../entries/Figures/Pawn"
import { Queen } from "../../entries/Figures/Queen"
import { Rook } from "../../entries/Figures/Rook"


export const randomColor = () =>{
    const num = Math.floor(Math.random() * 2)
    return num === 0 ? Color.WHITE : Color.BLACK
}

export const changeColor = (color:Color) =>{
    return color === Color.WHITE ? Color.BLACK : Color.WHITE
}

export interface BoardData{
    cells:Cell[]
    figures:Figure[]
}

export const createBoard = (boardData:BoardData,id:string) =>{
    const board = new Board(id,'online')
    const cells:Cell[][] = []
    for (let y = 0; y < 8; y++) {
        const row:Cell[] = []
        for (let x = 0; x < 8; x++) {
            const cell = boardData.cells.find(cell => cell.x === x && cell.y === y) as Cell
            row.push(new Cell(cell._id,x,y,cell.color,board))
        }
        cells.push(row)
    }
    board.cells = setFiguresToCells(boardData.figures,cells,board)

    return board

}

export const setFiguresToCells = (figures:Figure[],cells:Cell[][],board:Board) =>{
    figures.forEach(figure =>{
        cells[figure.y][figure.x].figure = getFigureClass(figure,board)
    })

    return cells
}


export const getFigureClass = (figure:Figure,board:Board) =>{
    switch(figure.name){
        case FigureNames.BISHOP:
            return new Bishop(figure._id,figure.x,figure.y,figure.color,board)
        case FigureNames.KING:
            return new King(figure._id,figure.x,figure.y,figure.color,board) 
        case FigureNames.KNIGHT:
            return new Knight(figure._id,figure.x,figure.y,figure.color,board)
        case FigureNames.PAWN:
            return new Pawn(figure._id,figure.x,figure.y,figure.color,board)
        case FigureNames.QUEEN:
            return new Queen(figure._id,figure.x,figure.y,figure.color,board)
        case FigureNames.ROOK:
            return new Rook(figure._id,figure.x,figure.y,figure.color,board)  
            
        default:
            return new Figure(figure._id,figure.x,figure.y,figure.color,board)    
    }

}


