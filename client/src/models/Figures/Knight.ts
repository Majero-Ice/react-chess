import logoB from '../../assets/black-knight.png'
import logoW from '../../assets/white-knight.png'
import {Figure} from "./Figure";
import {Color} from "../Color";
import {Cell} from "../Cell";
import {FigureName} from "../FigureName";


export class Knight extends Figure{
    constructor(cell:Cell,color:Color) {
        super(cell,color);
        this.name = FigureName.KNIGHT
        this.logo =
            this.color === Color.BLACK
                ? logoB
                : logoW
    }
    canMove(cell:Cell){


        const dx = Math.abs(this.cell.x - cell.x)
        const dy = Math.abs(this.cell.y - cell.y)

        return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);






    }
    moveFigure(){

    }
}