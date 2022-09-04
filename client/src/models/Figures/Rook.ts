import logoB from '../../assets/black-rook.png'
import logoW from '../../assets/white-rook.png'
import {Figure} from "./Figure";
import {Color} from "../Color";
import {Cell} from "../Cell";
import {FigureName} from "../FigureName";


export class Rook extends Figure{
    constructor(cell:Cell,color:Color) {
        super(cell,color);
        this.name = FigureName.ROOK
        this.logo =
            this.color === Color.BLACK
                ? logoB
                : logoW
    }
    canMove(cell:Cell){


        if (this.cell.isEmptyVertical(cell))
            return true
        if (this.cell.isEmptyHorizontal(cell))
            return true

        return  false

    }
    moveFigure(){

    }
}