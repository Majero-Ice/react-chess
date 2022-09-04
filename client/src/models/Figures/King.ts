import logoB from '../../assets/black-king.png'
import logoW from '../../assets/white-king.png'
import {Figure} from "./Figure";
import {Color} from "../Color";
import {Cell} from "../Cell";
import {FigureName} from "../FigureName";


export class King extends Figure{

    constructor(cell:Cell,color:Color) {
        super(cell,color);
        this.name = FigureName.KING
        this.logo =
            this.color === Color.BLACK
                ? logoB
                : logoW
    }
    canMove(cell:Cell) {


        const stepX = Math.abs(cell.x - this.cell.x) === 1 && cell.y ===this.cell.y

        const stepY =Math.abs(cell.y - this.cell.y) === 1 && cell.x ===this.cell.x

        const dx = Math.abs(cell.x - this.cell.x) === 1
        const dy = Math.abs(cell.y - this.cell.y) === 1


        if (stepX  || stepY)
            return true


        return dx && dy;

    }


    moveFigure(){

    }
}