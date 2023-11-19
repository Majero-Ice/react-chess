import {Color} from "./color";
import {Figure} from "../Figures/Figure";
import { Board } from "../Board/Board";


export class Cell {
    x:number
    y:number
    board:Board
    color:Color
    figure:Figure | null
    _id:number
    selected:boolean
    available:boolean
    
    constructor(_id:number,x:number,y:number,color:Color,board:Board) {
        this._id = _id
        this.x = x
        this.y = y
        this.board = board
        this.color = color
        this.figure = null
        this.selected = false
        this.available = false
    }

    setFigure(figure:Figure){
        this.figure = figure
        
    }

    moveFigure(target:Cell){
        if(this.figure){
            target.setFigure(this.figure)
            this.figure.move(target)
            this.figure = null
        }
    }


    get isEmpty(){
        return !this.figure
    }

    isEnemy(target:Cell){
        if (target.figure){
            return this.figure?.color !== target.figure.color;
        }
        return false
    }

    isEmptyVertical(target:Cell){
        if(this.x !== target.x){
            return false
        }
        const max = Math.max(this.y,target.y)
        const min = Math.min(this.y,target.y)

        for(let y = min + 1; y < max; y++){
            if (!this.board.getCell(this.x,y).isEmpty)
                return false
        }

        return true
        
    }

    isEmptyHorizontal(target:Cell){
        if(this.y !== target.y){
            return false
        }
        const max = Math.max(this.x,target.x)
        const min = Math.min(this.x,target.x)

        for(let x = min + 1; x < max; x++){
            if (!this.board.getCell(x,this.y).isEmpty)
                return false
        }

        return true
        
    }


    isEmptyDiagonal(target:Cell){
        const absX = Math.abs(this.x - target.x)
        const absY = Math.abs(this.y - target.y)

        if(absX !== absY){
            return false
        }
        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1

        for (let i = 1; i < absY; i++) {
            if(!this.board.getCell(this.x + dx*i, this.y + dy   * i).isEmpty)
                return false;
        }

        return true
    }

}
