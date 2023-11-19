import { Color } from "../Cell/color"
import { Figure } from "./Figure"
import { FigureNames } from "./FigureNames"
import imgB from '../../shared/assets/black-king.png'
import imgW from '../../shared/assets/white-king.png'
import { Board } from "../Board/Board"
import { Cell } from "../Cell/Cell"


export class King extends Figure{
    
    constructor(_id:string,x:number,y:number,color:Color,board:Board){
        super(_id,x,y,color,board)

        this.name = FigureNames.KING
        this.img =
         this.color === Color.BLACK 
            ? imgB 
            : imgW
    }


    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }

        const stepX = Math.abs(target.x - this.x) === 1 && target.y === this.y

        const stepY =Math.abs(target.y - this.y) === 1 && target.x === this.x

        const dx = Math.abs(target.x - this.x) === 1
        const dy = Math.abs(target.y - this.y) === 1


        if ((stepX  || stepY) && !this.willBeUnderAttack(target))
            return true
        
        return dx && dy && !this.willBeUnderAttack(target);

    }

    willBeUnderAttack(target:Cell){
        const prevFigure = target.figure
        target.figure = new Figure(String(Math.random()),target.x,target.y,this.color,this.board)
        for(let y = 0; y< this.board.cells.length; y++){
            const row = this.board.cells[y]
            for(let x = 0; x < row.length; x++){
                if(row[x].isEnemy(target) && row[x].figure?.canMove(target)){
                    target.figure = prevFigure
                    return true
                }
            }
        }
        target.figure = prevFigure

        return false
    }

    

}