import {Cell} from "./Cell";
import {Color} from "./Color";
import {Pawn} from "./Figures/Pawn";
import {Knight} from "./Figures/Knight";
import {Rook} from "./Figures/Rook";
import {Bishop} from "./Figures/Bishop";
import {Queen} from "./Figures/Queen";
import {King} from "./Figures/King";
import {FigureName} from "./FigureName";
import {Figure} from "./Figures/Figure";

export class Board{
    currentPlayer:Color = Color.WHITE
    socket:WebSocket | null
    sessionId:string
    invert:boolean
    playerColor:Color | null
    isTurn:boolean
    playerId:number |null
    cells:Cell [][] = []
    lostWhiteFigures:Figure[] = []
    lostBlackFigures:Figure[] = []

    constructor(websocket:WebSocket | null,sessionId:string,playerColor:Color | null,playerId:number |null,invert:boolean = false) {
        this.socket = websocket
        this.sessionId = sessionId
        this.playerColor = playerColor
        this.playerId = playerId
        this.invert = invert
        this.isTurn = true
    }

    createCells(){
        for (let y = this.invert ? 7 :0; this.invert ? y >= 0 : y < 8; this.invert ? y-- : y++) {
            const row:Cell[] = []
            for (let x = this.invert ? 7 :0; this.invert ? x >= 0 : x < 8; this.invert ? x-- : x++) {
                if ((y+x) % 2){
                    row.push(new Cell(this,x,y,Color.BLACK,null))
                }else {
                    row.push(new Cell(this,x,y,Color.WHITE,null))
                }
            }
            this.cells.push(row)
        }
    }
     getCell(x: number, y: number,invert:boolean = false) {

        return invert ? this.cells[7-y][7-x] : this.cells[y][x]
    }


     getCopyBoard(socket:WebSocket | null){
        const newBoard = new Board(socket,this.sessionId,this.playerColor,this.playerId,this.invert)
        newBoard.cells = this.cells
        newBoard.lostWhiteFigures = this.lostWhiteFigures
        newBoard.lostBlackFigures = this.lostBlackFigures
        return newBoard
    }
     nullProtection(){
        for (let y = 0; y < this.cells.length; y++) {
            const row = this.cells[y]
            for (let x = 0; x < row.length; x++) {
                const current = row[x]
                if (current.figure?.protector){
                    current.figure.protector = false
                }
                if (current.availableProtection){
                    current.availableProtection = false
                }

            }

        }
    }

     highlightedCells(selected:Cell | null){
        for (let y = 0; y < this.cells.length; y++) {
            const row = this.cells[y]
            for (let x = 0; x < row.length; x++) {
                const current = row[x]
                const currentFigure = current.figure
                if (selected?.isFigureOpenKing()){
                    current.available = false
                }
                else{
                    current.figure = null

                    if (selected && selected.figure?.name === FigureName.KING && selected?.isEnemyCanMove(current)){
                        current.available = false
                        current.figure = currentFigure
                    } else {
                        current.figure = currentFigure
                        current.available = !! selected?.figure?.canMove(current) && current.isEnemy(selected)
                    }


                }

            }

        }

    }
     checkHighlightedCells(selected:Cell | null){
        for (let y = 0; y < this.cells.length; y++) {
            const row = this.cells[y]
            for (let x = 0; x < row.length; x++) {
                const current = row[x]
                console.log(selected);

                current.available = !! selected?.figure?.canMove(current) && current.availableProtection

            }

        }

    }



     getFigures(){
        this.addPawn()
        this.addKnight()
        this.addRook()
        this.addBishop()
        this.addQueen()
        this.addKing()
    }

   private addPawn(){
        for (let i = 0; i < 8; i++) {
            new Pawn(this.getCell(i,1),this.invert ? Color.WHITE :Color.BLACK)
            new Pawn(this.getCell(i,6),this.invert ? Color.BLACK :Color.WHITE)

        }
    }
   private addKnight(){
        new Knight(this.getCell(1,0),this.invert ? Color.WHITE :Color.BLACK)
        new Knight(this.getCell(6,0),this.invert ? Color.WHITE :Color.BLACK)
        new Knight(this.getCell(1,7),this.invert ? Color.BLACK :Color.WHITE)
        new Knight(this.getCell(6,7),this.invert ? Color.BLACK :Color.WHITE)
    }
   private addRook(){
        new Rook(this.getCell(0,0),this.invert ? Color.WHITE :Color.BLACK)
        new Rook(this.getCell(7,0),this.invert ? Color.WHITE :Color.BLACK)
        new Rook(this.getCell(0,7),this.invert ? Color.BLACK :Color.WHITE)
        new Rook(this.getCell(7,7),this.invert ? Color.BLACK :Color.WHITE)
    }
   private addBishop(){
        new Bishop(this.getCell(2,0),this.invert ? Color.WHITE :Color.BLACK)
        new Bishop(this.getCell(5,0),this.invert ? Color.WHITE :Color.BLACK)
        new Bishop(this.getCell(2,7),this.invert ? Color.BLACK :Color.WHITE)
        new Bishop(this.getCell(5,7),this.invert ? Color.BLACK :Color.WHITE)
    }
   private addQueen(){
        new Queen(this.getCell(this.invert ? 4 : 3,0),this.invert ? Color.WHITE :Color.BLACK)
        new Queen(this.getCell(this.invert ? 4 : 3,7),this.invert ? Color.BLACK :Color.WHITE)
    }
   private addKing(){
        new King(this.getCell(this.invert ? 3 : 4,0),this.invert ? Color.WHITE :Color.BLACK)
        new King(this.getCell(this.invert ? 3 : 4,7),this.invert ? Color.BLACK :Color.WHITE)
    }


}



