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
    checkHandler, endGameHandler,
    highlightCell,
    restartHandler,
    updateBoard
} from "../utils";
import Modal from "./UI/Modal/Modal";
import Button from "./UI/Button/Button";

interface BoardProps {
    board:Board
    socket:WebSocket | null
    setBoard:(board:Board) => void

}


const BoardOnlineComponent:FC <BoardProps> = ({board,setBoard,socket}) => {

    const [selected,setSelected] = useState<Cell | null>(null)
    const [currentPlayer,setCurrentPlayer] = useState<Color>(Color.WHITE)
    const [isCheck,setIsCheck] = useState<boolean>(false)
    const [endGameModal,setEndGameModal] = useState<boolean>(false)
    const params = useParams()

    useEffect(() =>{
        setBoard(highlightCell(board,selected,isCheck))
    },[selected])

    useEffect(() =>{
        if (isCheck && socket){
            checkHandler(socket,params.id)
        }
    },[isCheck])


    if (socket){
        socket.onmessage =(event) =>{
            let msg = JSON.parse(event.data)
            switch (msg.method){
                case 'enemyMove':
                    enemyMove(msg)

                    changeColorHandler(socket,params.id,currentPlayer)

                    canAttackKing(msg)
                    break
                case 'changeColor':
                    setCurrentPlayer(msg.currentPlayer === Color.WHITE ? Color.BLACK : Color.WHITE)
                    setBoard(updateBoard(board))
                    break
                case 'check':
                    setIsCheck(true)
                    break
                case 'restart':
                    document.location.reload()
                    break
                case 'endGame':
                    console.log(2);
                    setEndGameModal(true)
                    break
            }
        }
    }

    const click = (cell:Cell) => {
        if ((isCheck && cell.figure?.protector) ||
            (cell.figure?.name === FigureName.KING
                && cell.figure.color === board.playerColor && cell.figure.color === currentPlayer)){

            setSelected(cell)

        }else if(selected && selected !== cell && selected.figure?.canMove(cell) && cell.available
            && !cell.figure?.protector ){
            selected.sendFiguresToServer(cell)
            selected.moveFigure(cell)

            setSelected(null)

            if (cell.canAttackKing() && !cell.canAttackKing()?.canKingMove()){
                endGameHandler(socket,params.id)
            }

            if (cell.canAttackKing()){
                setIsCheck(true)

            }else{
                setIsCheck(false)
                board.nullProtection()
            }
            setCurrentPlayer(changeCurrentPlayer(currentPlayer))

        } else if (cell.figure && !cell.figure?.protector
            && !isCheck && cell.figure.color === board.playerColor && cell.figure.color === currentPlayer )
            setSelected(cell)

    }

    const canAttackKing = (msg:any)=>{
        if (!board.getCell( msg.targetX, msg.targetY,board.invert).canAttackKing()){
            setIsCheck(false)
            board.nullProtection()
        }
    }


    const enemyMove = (msg:any) =>{
        board
            .getCell( msg.startX,  msg.startY,board.invert)
            .moveFigure(board.getCell( msg.targetX, msg.targetY,board.invert))
        setBoard(updateBoard(board))
    }

    return (
        <div className='board'>

            {endGameModal
                ? <Modal modal={endGameModal} title={`${changeCurrentPlayer(currentPlayer)} player won!`.toUpperCase()}>
                    <Button click={() => {
                        setEndGameModal(false)
                        restartHandler(socket,params.id)
                    }
                    }>Again?</Button>
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

export default BoardOnlineComponent;