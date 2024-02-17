import { Color } from "../Cell/color"
import { Figure } from "./Figure"
import { FigureNames } from "./FigureNames"
import {figureImages} from '../../shared'
import { Cell } from "../Cell/Cell"
import { Board } from "../Board/Board"


export class Queen extends Figure{
    
    constructor(_id:string,x:number,y:number,color:Color,board:Board){
        super(_id,x,y,color,board)

        this.name = FigureNames.QUEEN
        this.img =
         this.color === Color.BLACK 
            ? figureImages.blackQueen 
            : figureImages.whiteQueen
    }

    canMove(target: Cell): boolean { 
        if(!super.canMove(target)){ 
            return false
        }
        return this.board.getCell(this.x,this.y).isEmptyVertical(target) 
                || this.board.getCell(this.x,this.y).isEmptyHorizontal(target)
                || this.board.getCell(this.x,this.y).isEmptyDiagonal(target)
    }
}