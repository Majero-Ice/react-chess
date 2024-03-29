import { Color } from "../Cell/color";
import { Figure } from "./Figure";
import { FigureNames } from "./FigureNames";
import {figureImages} from '../../shared'
import { Board } from "../Board/Board";
import { Cell } from "../Cell/Cell";

export class Pawn extends Figure{
    
    isFirstStep:boolean = true

    constructor(_id:string,x:number,y:number,color:Color,board:Board){
        super(_id,x,y,color,board)
        
        this.name = FigureNames.PAWN
        this.img =
         this.color === Color.BLACK 
            ? figureImages.blackPawn 
            : figureImages.whitePawn
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }

        const direction = this.color === Color.BLACK ? 1 : -1

        const firstStep = this.color === Color.BLACK ? 2 : -2

        const step = (target.y === this.y + direction)
            || (this.isFirstStep && (target.y === this.y + firstStep))

        const rightAttack = target.x === this.x + direction && target.y === this.y +direction

        const leftAttack = target.x === this.x - direction && target.y === this.y +direction

        if (step && target.x === this.x
            && this.board.getCell(target.x, target.y).isEmpty
            && this.board.getCell(this.x, this.y + direction).isEmpty){
            return true
        }

        if ((rightAttack || leftAttack) && this.board.getCell(this.x,this.y).isEnemy(target)){
            return true
        }

        return false    
    }

    move(target: Cell): void { 
        super.move(target)
        this.isFirstStep = false
    }
}