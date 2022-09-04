import logoB from '../../assets/black-bishop.png'
import logoW from '../../assets/white-bishop.png'
import {Figure} from "./Figure";
import {Color} from "../Color";
import {Cell} from "../Cell";
import {FigureName} from "../FigureName";


export class Bishop extends Figure{
    constructor(cell:Cell,color:Color) {
        super(cell,color);
        this.name = FigureName.BISHOP
        this.logo =
            this.color === Color.BLACK
                ? logoB
                : logoW
    }
    canMove(cell:Cell){

        return this.cell.isEmptyDiagonal(cell);

    }
    moveFigure(){

    }
}