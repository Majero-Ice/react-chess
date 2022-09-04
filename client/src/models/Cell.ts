import {Color} from "./Color";
import {Figure} from "./Figures/Figure";
import {Board} from "./Board";
import {FigureName} from "./FigureName";

export class Cell{
    x:number
    y:number
    board:Board
    color:Color
    figure:Figure | null
    selected:boolean
    id:number
    available:boolean
    availableProtection:boolean

    constructor(board:Board,x:number,y:number,color:Color,figure:Figure | null) {
        this.x = x
        this.y = y
        this.color = color
        this.figure = figure
        this.selected = false
        this.availableProtection = false
        this.id = Math.random()
        this.available = false
        this.board = board
    }
   private setFigure(figure: Figure) {
            this.figure = figure;
            this.figure.cell = this;
        console.log(this.board.lostBlackFigures);
        console.log(this.board.lostWhiteFigures);

    }
    moveFigure(target: Cell) {
        if(this.figure && this.figure?.canMove(target)) {
            if (target.figure) {
                this.addLostFigure(target.figure);
            }
            this.figure.moveFigure()
            target.setFigure(this.figure);
            this.figure = null;

            if (target.canAttackKing()){
                target.saveFromCheck()

            }
        }
    }
    sendFiguresToServer(target:Cell){
        this.board.socket?.send(JSON.stringify({
            socketId:this.board.sessionId,
            startX:this.x,
            startY:this.y,
            targetX:target.x,
            targetY:target.y,
            playerColor:this.board.playerColor,
            playerId:this.board.playerId,
            method:'enemyMove'
        }))
    }

    isEmpty()  {
        return this.figure === null
    }
    isEnemy(cell:Cell){
        if (cell.figure){
            return this.figure?.color !== cell.figure.color;
        }
        return false
    }

    canAttackKing(){


        for (let y = 0; y < this.board.cells.length; y++) {
            const row = this.board.cells[y]
            for (let x = 0; x < row.length; x++) {
                const current = row[x]
                if (current.figure?.name === FigureName.KING && this.figure?.canMove(current) && this.isEnemy(current)){
                    return current
                }
            }

        }
        return null
    }
   private addLostFigure(figure: Figure) {
        figure.color === Color.BLACK
            ? this.board.lostBlackFigures.push(figure)
            : this.board.lostWhiteFigures.push(figure)
    }
    canKingMove(){
        for (let y = 0; y < this.board.cells.length; y++) {
            const row = this.board.cells[y]
            for (let x = 0; x < row.length; x++) {
                const current = row[x]

                if (this.figure?.canMove(current) && !this.isEnemyCanMove(current) && this.isEnemy(current)){
                    console.log(current);
                    return true
                }

            }
        }
        return false
    }

    isFigureOpenKing(){
        for (let y = 0; y < this.board.cells.length; y++) {
            const row = this.board.cells[y]
            for (let x = 0; x < row.length; x++) {
                const current = row[x]
                const startFigure = this.figure
                const currentStartFigure = current.figure
                if (this.figure?.canMove(current)  && this.figure?.name !== FigureName.KING){
                    current.figure = this.figure
                    this.figure = null
                    if (current.isKingUnderAttack()){
                        this.figure = startFigure
                        current.figure = currentStartFigure
                        return true
                    }

                    this.figure = startFigure
                    current.figure = currentStartFigure
                }

            }
        }
        return false
    }
   private isKingUnderAttack(){
        for (let y = 0; y < this.board.cells.length; y++) {
            const row = this.board.cells[y]
            for (let x = 0; x < row.length; x++) {
                const current = row[x]
                if (current.canAttackKing() && !current.canAttackKing()?.isEnemy(this)){
                    return true
                }

            }
        }
        return  false
    }


   private getProtectors(slayer:Cell,cell:Cell){
        const protectors:Figure[] = []
        for (let y = 0; y < this.board.cells.length; y++) {
            const row = this.board.cells[y]
            for (let x = 0; x < row.length; x++) {
                const current = row[x]

                if (!this.isEnemy(current)  && current.figure?.name !== FigureName.KING
                    && ((current.figure?.canMove(cell) && slayer.figure?.canMove(cell))
                        || current.figure?.canMove(slayer))){

                     protectors.push(current.figure)

                }

            }
        }
        return protectors
    }

   private saveFromCheck(){
        for (let y = 0; y < this.board.cells.length; y++) {
            const row = this.board.cells[y]

            for (let x = 0; x < row.length; x++) {
               const current = row[x]

                if (this.figure?.canMove(current) && !current.figure
                    && this.canAttackKing()?.getProtectors(this, current)){

                    const protectors = this.canAttackKing()?.getProtectors(this, current)

                    const currentFigure = current.figure

                    protectors?.forEach((protector) =>{
                        if (protector.canMove(this) && !this.availableProtection){
                            protector.protector = true
                            this.availableProtection = true
                        }

                        current.figure = protector

                        if (this.canAttackKing()){
                            current.figure = currentFigure
                        }else {
                            if (protector)
                                protector.protector = true

                            current.availableProtection = true
                            current.figure = null

                        }
                    })

                }


            }
        }

        return  this.canAttackKing() && !this.canAttackKing()?.canKingMove()

    }



    isEnemyCanMove(cell:Cell){
        for (let y = 0; y < this.board.cells.length; y++) {
            const row = this.board.cells[y]
            for (let x = 0; x < row.length; x++) {
                const current = row[x]


                if (current.figure?.name === FigureName.PAWN && this.isEnemy(current)
                    && this.figure?.canMove(cell) && cell.isEmpty()){

                    const direction = current.figure.color === Color.BLACK ? 1 : -1

                    const rightAttack = cell.x === current.x + direction && cell.y === current.y +direction

                    const leftAttack = cell.x === current.x - direction && cell.y ===  current.y +direction

                    if (rightAttack || leftAttack){
                        return true
                    }

                }

                if (this.figure?.canMove(cell) && current.figure?.canMove(cell)
                    && this.isEnemy(current) && current.figure.name !== FigureName.PAWN){
                    return true
                }


            }

        }
        return false
    }



    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false;
        }
        const max = Math.max(this.y,target.y)
        const min = Math.min(this.y,target.y)
        for (let y = min+1; y < max ; y++) {
            if (!this.board.getCell(this.x,y,this.board.invert).isEmpty())
                return false
        }
        return  true
    }
    isEmptyHorizontal(target:Cell){

            if (this.y !== target.y) {
                return false;
            }
            const max = Math.max(this.x,target.x)
            const min = Math.min(this.x,target.x)
            for (let x = min+1; x < max ; x++) {
                if (!this.board.getCell(x,this.y,this.board.invert).isEmpty())
                    return false

            }

            return  true
        }


    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if(absY !== absX)
            return false;

        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1

        for (let i = 1; i < absY; i++) {
            if(!this.board.getCell(this.x + dx*i, this.y + dy   * i,this.board.invert).isEmpty())
                return false;
        }
        return true;
    }
    }
