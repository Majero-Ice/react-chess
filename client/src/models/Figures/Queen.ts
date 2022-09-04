import logoB from '../../assets/black-queen.png'
import logoW from '../../assets/white-queen.png'
import {Figure} from "./Figure";
import {Color} from "../Color";
import {Cell} from "../Cell";
import {FigureName} from "../FigureName";


export class Queen extends Figure{
    constructor(cell:Cell,color:Color) {
        super(cell,color);
        this.name = FigureName.QUEEN
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
        if (this.cell.isEmptyDiagonal(cell))
            return true

        return  false

    }
    moveFigure(){

    }
}