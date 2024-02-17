import { Color } from "../Cell/color"
import { Figure } from "./Figure"
import { FigureNames } from "./FigureNames"
import {figureImages} from '../../shared'
import { Board } from "../Board/Board"
import { Cell } from "../Cell/Cell"


export class Rook extends Figure{
    
    constructor(_id:string,x:number,y:number,color:Color,board:Board){
        super(_id,x,y,color,board)

        this.name = FigureNames.ROOK
        this.img =
         this.color === Color.BLACK 
            ? figureImages.blackRook 
            : figureImages.whiteRook
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }

        return this.board.getCell(this.x,this.y).isEmptyVertical(target)
                || this.board.getCell(this.x,this.y).isEmptyHorizontal(target)
    }
}