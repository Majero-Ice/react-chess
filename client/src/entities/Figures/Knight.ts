import { Color } from "../Cell/color"
import { Figure } from "./Figure"
import { FigureNames } from "./FigureNames"
import {figureImages} from '../../shared'
import { Board } from "../Board/Board"
import { Cell } from "../Cell/Cell"


export class Knight extends Figure{
    
    constructor(_id:string,x:number,y:number,color:Color,board:Board){
        super(_id,x,y,color,board)

        this.name = FigureNames.KNIGHT
        this.img =
         this.color === Color.BLACK 
            ? figureImages.blackKnight 
            : figureImages.whiteKnight
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }

        const dx = Math.abs(this.x - target.x)
        const dy = Math.abs(this.y - target.y)

        return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);

    }
}