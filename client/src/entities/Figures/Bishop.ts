import { Color } from "../Cell/color"
import { Figure } from "./Figure"
import { FigureNames } from "./FigureNames"
import {figureImages} from '../../shared'
import { Board } from "../Board/Board"
import { Cell } from "../Cell/Cell"


export class Bishop extends Figure{
    
    constructor(_id:string,x:number,y:number,color:Color,board:Board){
        super(_id,x,y,color,board)

        this.name = FigureNames.BISHOP
        this.img =
         this.color === Color.BLACK 
            ? figureImages.blackBishop 
            : figureImages.whiteBishop
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }

        return this.board.getCell(this.x,this.y).isEmptyDiagonal(target)
    }

}