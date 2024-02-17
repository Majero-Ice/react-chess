import {FC, memo} from 'react';
import {Color, Cell, FigureNames} from "../../entities";
import styles from './cell.module.scss'


interface CellComponentProps {
    cell:Cell
    selected:boolean
    isCheck:boolean
    click:(cell:Cell) => void
}

export const CellComponent:FC<CellComponentProps> = memo(({cell,selected,click,isCheck}) => {


    return (
        <div className={cell.figure?.name === FigureNames.KING && cell.board.isKingUnderAttack(cell) ? styles.check :  selected || (cell.available && cell.figure) ? styles.selected : cell.color === Color.BLACK ? styles.black : styles.white} onClick={() =>click(cell)}>
            {cell.figure ? <img src={cell.figure?.img} alt=" " /> : ''}
            {cell.available && !cell.figure ? <div className={styles.available}></div> : ''}
        </div>
    );
});