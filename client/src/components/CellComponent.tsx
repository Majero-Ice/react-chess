import React, {FC} from 'react';
import {Cell} from "../models/Cell";
import {FigureName} from "../models/FigureName";
import '../styles/cell.css'
import {CSSTransition, TransitionGroup} from "react-transition-group";
interface CellProps {
    cell:Cell,
    selected:boolean,
    click: (cell: Cell) => void;
}
const CellComponent:FC<CellProps> = ({cell,selected,click}) => {
    return (
        <div className={['cell',selected ? "selected" : cell.color].join(' ')}
             onClick={() => click(cell)}
             style={{background:cell.available && cell.figure && cell.figure?.name !== FigureName.FIGURE ? 'green' : ''}}
        >
            <TransitionGroup>
                {cell.figure?.logo &&
                    <CSSTransition
                        key={cell.figure.id}
                        timeout={100}
                        classNames="figure">
                        <img src={cell.figure.logo} alt=""/>
                    </CSSTransition>
                }
                {cell.available &&(!cell.figure || cell.figure.name === FigureName.FIGURE) &&
                    <CSSTransition
                        key={Math.random()}
                        timeout={500}
                        classNames="highlighted"
                    >
                        <div/>
                    </CSSTransition>
                }
            </TransitionGroup>
        </div>
    );
};

export default CellComponent;