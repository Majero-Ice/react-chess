import React, {FC, memo} from 'react';
import {Color} from "../../entries/Cell/color";
import styles from './cell.module.scss'
import { Cell } from '../../entries/Cell/Cell';
import { FigureNames } from '../../entries/Figures/FigureNames';
import { Figure } from '../../entries/Figures/Figure';

interface CellComponentProps {
    cell:Cell
    selected:boolean
    isCheck:boolean
    figure:Figure | null
    click:(cell:Cell) => void
}

const CellComponent:FC<CellComponentProps> = memo(({cell,selected,click,figure}) => {


    return (
        <div 
        className={cell.figure?.name === FigureNames.KING && cell.board.isKingUnderAttack(cell) 
            ? styles.check 
            :  selected || (cell.available && cell.figure) 
            ? styles.selected 
            : cell.color === Color.BLACK 
            ? styles.black 
            : styles.white} 
        onClick={() =>click(cell)}>
            {figure ? <img src={figure?.img} alt=" " /> : ''}
            {cell.available && !cell.figure ? <div className={styles.available}></div> : ''}
        </div>
    );
});

export default CellComponent;