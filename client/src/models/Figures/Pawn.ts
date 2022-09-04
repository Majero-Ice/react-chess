import {Figure} from "./Figure";
import {Cell} from "../Cell";
import {Color} from "../Color";
import logoB from '../../assets/black-pawn.png'
import logoW from '../../assets/white-pawn.png'
import {FigureName} from "../FigureName";


export class Pawn extends Figure{

    isFirstStep:boolean = true

    constructor(cell:Cell,color:Color) {
        super(cell,color);

        this.name = FigureName.PAWN
        this.logo =
            this.color === Color.BLACK
            ? logoB
            : logoW
    }
    canMove(cell:Cell) {

        const direction = this.color === Color.BLACK ? 1 : -1

        const firstStep = this.color === Color.BLACK ? 2 : -2

        const step = (cell.y === this.cell.y + direction)
            || (this.isFirstStep && (cell.y === this.cell.y + firstStep))

        const rightAttack = cell.x === this.cell.x + direction && cell.y === this.cell.y +direction

        const leftAttack = cell.x === this.cell.x - direction && cell.y === this.cell.y +direction



        if (step && cell.x === this.cell.x
            && this.cell.board.getCell(cell.x, cell.y,this.cell.board.invert).isEmpty()
            && this.cell.board.getCell(this.cell.x, this.cell.y + direction,this.cell.board.invert).isEmpty()){
            return true
        }

        if ((rightAttack || leftAttack) && this.cell.isEnemy(cell) && cell.figure?.name !== FigureName.FIGURE){
            return true
        }
        return false

    }
    moveFigure(){
        this.isFirstStep = false
    }
}