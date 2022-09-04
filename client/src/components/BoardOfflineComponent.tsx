import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {FigureName} from "../models/FigureName";
import {Color} from "../models/Color";
import {useParams} from "react-router-dom";
import {
    changeColorHandler,
    changeCurrentPlayer,
    checkHandler,
    highlightCell,
    restartHandler,
    updateBoard
} from "../utils";
import Modal from "./UI/Modal/Modal";
import Button from "./UI/Button/Button";

interface BoardProps {
    board:Board
    setBoard:(board:Board) => void
}


const BoardOfflineComponent:FC <BoardProps> = ({board,setBoard}) => {

    const [selected,setSelected] = useState<Cell | null>(null)
    const [currentPlayer,setCurrentPlayer] = useState<Color>(Color.WHITE)
    const [isCheck,setIsCheck] = useState<boolean>(false)
    const [checkModal,setCheckModal] = useState<boolean>(false)
    const params = useParams()

    useEffect(() =>{
        setBoard(highlightCell(board,selected,isCheck))
    },[selected])

    useEffect(() =>{
        if (isCheck){
            checkHandler(null,params.id)
        }
    },[isCheck])




    const click = (cell:Cell) => {
        if ((isCheck && cell.figure?.protector) ||
            (cell.figure?.name === FigureName.KING && cell.figure.color === currentPlayer)){

            setSelected(cell)

        }else if(selected && selected !== cell && selected.figure?.canMove(cell) && cell.available
            && !cell.figure?.protector ){
            selected.sendFiguresToServer(cell)
            selected.moveFigure(cell)

           setCurrentPlayer(changeCurrentPlayer(currentPlayer))

            setSelected(null)

            if (cell.canAttackKing() && !cell.canAttackKing()?.canKingMove()){
                setCheckModal(true)
            }

            if (cell.canAttackKing()){
                setIsCheck(true)

            }else{
                setIsCheck(false)
                board.nullProtection()
            }
            setCurrentPlayer(changeCurrentPlayer(currentPlayer))

        } else if (cell.figure && !cell.figure?.protector
            && !isCheck && cell.figure.color === currentPlayer )
            setSelected(cell)

    }





    return (
        <div className='board'>

            {checkModal
                ? <Modal modal={checkModal} title={`${changeCurrentPlayer(currentPlayer)} player won!`.toUpperCase()}>
                    <Button click={() => document.location.reload()}>Again?</Button>
                </Modal>: ''
            }

            {board.cells.map((row,index)=>
                <React.Fragment key={index}>
                    {row.map((cell) =>
                        <CellComponent cell={cell} key={cell.id}
                                       selected={!!selected?.figure && selected === cell}
                                      click={() =>click(cell)}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default BoardOfflineComponent;