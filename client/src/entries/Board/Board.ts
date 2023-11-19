import { addFigures } from "../../shared/lib/setFiguresOffline";
import {Cell} from "../Cell/Cell";
import {Color} from "../Cell/color";
import { Figure } from "../Figures/Figure";
import { FigureNames } from "../Figures/FigureNames";


export class Board {
    cells:Cell[][] = []
    currentPlayer:Color = Color.WHITE
    id:string
    gameMode:string

    constructor(id:string, gameMode:string){
        this.id = id
        this.gameMode = gameMode
        if(this.gameMode === 'offline'){
            this.createCells()
            this.setFigures()
        }
    }

    createCells(){
        for (let y = 0; y < 8; y++) {
            const row:Cell[] = [] 
            for (let x = 0; x < 8; x++) {
                if((x+y) % 2 === 0 ){ 
                    row.push(new Cell(Math.random(),x,y,Color.WHITE,this))
                }else{
                    row.push(new Cell(Math.random(),x,y,Color.BLACK,this))
                }
            }
            this.cells.push(row)
        }
        
    }

    setFigures(){
        const figures = addFigures(this)
        figures.forEach(figure =>{
            this.cells[figure.y][figure.x].figure = figure
        })
    }
    
    getCell(x:number,y:number){
        return this.cells[y][x]
    }

    togglePlayer(){
        this.currentPlayer === Color.WHITE 
            ? this.currentPlayer = Color.BLACK
            : this.currentPlayer = Color.WHITE
    }


    getCopyBoard(){
        const newBoard = new Board(this.id,this.gameMode)
        newBoard.cells = this.cells
        newBoard.currentPlayer = this.currentPlayer

        return newBoard
    }

    getAvailableMoves(selectedCell:Cell | null){
        let res = false
        for(let y = 0; y < this.cells.length; y++){
            const row = this.cells[y]
            for(let x = 0; x < row.length; x++){
                const target = row[x]
                if(selectedCell?.figure?.canMove(target)){
                    const selectedCellFigure = selectedCell.figure
                        const targetFigure = target.figure
                        selectedCell.figure = null
                        target.setFigure(selectedCellFigure)
                        if(this.isKingUnderAttack(this.getKing(selectedCellFigure.color))){
                            target.available = false
                        }else{
                            target.available = true
                            res = true
                        }
                        selectedCell.setFigure(selectedCellFigure)
                        target.figure = targetFigure
                    
                }else
                target.available = false 
            }
        }

        return res
    }

    isKingPossibleMoves(king:Figure | null){
        if(!king){
            return false
        }
        for(let y = 0; y< this.cells.length; y++){
            const row = this.cells[y]
            for(let x = 0; x < row.length; x++){
                if(king.canMove(row[x])){
                    return true
                }
            }
        }
        
        
        return false
    }

    getKing(color:Color):Cell | null{
        for(let y = 0; y < this.cells.length; y++){
            const row = this.cells[y]
            for(let x = 0; x < row.length; x++){
                const target = row[x]
                if(target.figure?.color === color && target.figure?.name === FigureNames.KING){
                    return target
                }
            }
        }
    return null
    }

    

    isKingUnderAttack(king:Cell | null){
        if(!(king?.figure && king?.figure.name === FigureNames.KING)){
            return false
        }
        for(let y = 0; y < this.cells.length; y++){
            const row = this.cells[y]
            for(let x = 0; x < row.length; x++){
                const target = row[x]
                if(target.figure?.canMove(king)){
                    console.log(target)
                    return true
                }
            }
        }
        return false
    }

}