import { Cell } from "../Cell/Cell"
import { Color } from "../Cell/color"
import { FigureNames } from "./FigureNames"
import {figureImages} from '../../shared'
import { Board } from "../Board/Board"

export class Figure {
    x:number
    y:number
    img:typeof figureImages.blackPawn
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
        this.img = figureImages.blackPawn
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