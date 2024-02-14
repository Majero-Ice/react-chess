import { Middleware } from "@reduxjs/toolkit";
import { cellActions } from "../../../entries/Cell/slice/cellSlice";
import { Figure } from "../../../entries/Figures/Figure";
import { getFigure } from "../../../shared/lib/board";


const boardMiddleware:Middleware = store => next => action =>{
    const {getState,dispatch} = store
    const cellSlice = getState().cellSlice
    const figureSlice = getState().figureSlice
    // if(cellActions.setSelected.match(action)){
    //     let res = false
    //     const {x,y} = cellSlice.selected
    //     const figure:Figure | null = getFigure(figureSlice.figures,x,y)
    //     for(let y = 0; y < cellSlice.cells.length; y++){
    //         const row = cellSlice.cells[y]
    //         for(let x = 0; x < row.length; x++){
    //             const target = row[x]
    //             if(figure?.canMove(target)){
    //                     const targetFigure = target.figure
    //                     selectedCell.figure = null
    //                     target.setFigure(figure)
    //                     if(this.isKingUnderAttack(this.getKing(figure.color))){
    //                         target.available = false
    //                     }else{
    //                         target.available = true
    //                         res = true
    //                     }
    //                     selectedCell.setFigure(selectedCellFigure)
    //                     target.figure = targetFigure
                    
    //             }else
    //             target.available = false 
    //         }
    //     }

    //     return res    
    // }
}

export default boardMiddleware