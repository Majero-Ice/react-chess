import {Cell} from "../Cell";
import {Color} from "../Color";
import {FigureName} from "../FigureName";
import logoB from '../../assets/black-pawn.png'

export class Figure {
    cell:Cell
    color:Color
    name:FigureName
    protector:boolean
    logo: typeof logoB
    id:number = Math.random()

    constructor(cell:Cell,color:Color) {
        this.cell = cell
        this.color = color
        this.name = FigureName.FIGURE
        this.logo = logoB
        this.cell.figure = this
        this.protector = false
    }
    canMove(cell:Cell){

        return false



    }


    moveFigure(){

    }
}