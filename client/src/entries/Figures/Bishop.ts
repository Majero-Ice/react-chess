import { Color } from "../Cell/color"
import { Figure } from "./Figure"
import { FigureNames } from "./FigureNames"
import imgB from '../../shared/assets/black-bishop.png'
import imgW from '../../shared/assets/white-bishop.png'
import { Board } from "../Board/Board"
import { Cell } from "../Cell/Cell"


export class Bishop extends Figure{
    
    constructor(_id:string,x:number,y:number,color:Color){
        super(_id,x,y,color)

        this.name = FigureNames.BISHOP
        this.img =
         this.color === Color.BLACK 
            ? imgB 
            : imgW
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }
        return true

        // return this.board.getCell(this.x,this.y).isEmptyDiagonal(target)
    }

}