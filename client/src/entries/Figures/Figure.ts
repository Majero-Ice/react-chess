import { Cell } from "../Cell/Cell"
import { Color } from "../Cell/color"
import { FigureNames } from "./FigureNames"
import imgB from '../../shared/assets/black-pawn.png'
import { Board } from "../Board/Board"

export class Figure {
    x:number
    y:number
    img:typeof imgB
    color:Color
    name:FigureNames
    _id:string
    board:Board

    constructor(_id:string,x:number,y:number,color:Color,board:Board){
        this._id = _id.length ? _id : String(Date.now)
        this.x = x
        this.y = y
        this.color = color
        this.name = FigureNames.FIGURE
        this.img = imgB
        this.board = board  

        

    }

    canMove(target:Cell):boolean{
        if(target.figure?.color === this.color){
            return false   
        }
        return true
    }

    move(target:Cell){
        this.x = target.x
        this.y = target.y
    }
}