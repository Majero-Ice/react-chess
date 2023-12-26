import React, {FC,memo,useCallback, useContext, useEffect, useState} from 'react';
import styles from './board.module.scss'
import {Board} from "../../entries/Board/Board";
import CellComponent from "../../features/Cell/CellComponent";
import { Cell } from '../../entries/Cell/Cell';
import { Color } from '../../entries/Cell/color';
import { Figure } from '../../entries/Figures/Figure';
import PlayerPanel from '../PlayerPanel/PlayerPanel';
import { SocketContext } from '../../app/context/SocketContext';
import { changeColor } from '../../shared/lib/board';
import Modal from '../../shared/UI/Modal/Modal';
import Button from '../../shared/UI/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteNames } from '../../app/routes/routes';
import { useVictory } from '../../shared/lib/hooks/useVictory';
import { useTypedSelector } from '../../shared/lib/hooks/useTypedSelector';
import { GameMode } from '../../entries/Board/slice/types';
import { useActions } from '../../shared/lib/hooks/useActions';

const BoardComponent = () => {

    const socket = useContext(SocketContext)
    const navigate = useNavigate()
    const {board} = useTypedSelector(state =>state.boardSlice)
    const {user,opponent,currentPlayer} = useTypedSelector(state => state.playerSlice)
    const {cells} = useTypedSelector(state => state.cellSlice)
    const [selected,setSelected] = useState<Cell | null>(null)
    const {id} = useParams()
    const {isVictory,isCheck} = useVictory(board as Board)
    const {gameMode} = useTypedSelector(state => state.boardSlice)
    const {addLostFigure} = useActions()


    useEffect(() =>{
        board?.getAvailableMoves(selected ?? null)
    },[selected])

    const addLostFigureOld = (cell:Cell,emit:boolean) =>{
        if(!cell.figure){
            return null
        }   
        let playerId = ''
        if(cell.figure.color !== user?.color){
            user?.lostFigures.push(cell.figure as Figure)
            addLostFigure({figure:cell.figure,isUser:true})
            playerId = user?._id as string
        }else{
            opponent?.lostFigures.push(cell.figure as Figure)
            addLostFigure({figure:cell.figure,isUser:false})
            playerId = opponent?._id as string
        }
        if(emit){
            socket.emit('add-figure',{gameId:id,figureId:cell.figure._id,playerId})
        }
    }



    const click = useCallback((cell:Cell) =>{
        if(selected && cell.available){
            addLostFigureOld(cell,gameMode === GameMode.ONLINE)
            selected.moveFigure(cell)
            setSelected(null)
            localStorage.setItem('currentPlayer',changeColor(currentPlayer))
        }else if(
            ((user?.color === cell.figure?.color && (gameMode === GameMode.ONLINE) && user?.color === currentPlayer) ||
            (currentPlayer === cell.figure?.color && gameMode === GameMode.OFFLINE)) 
         ){
            setSelected(cell)
        }
    },[selected,board,currentPlayer])

    const getRow = (row:Cell[]) =>{
        const cells = row.map((cell) =>
        <CellComponent 
        cell={cell}
        key={cell._id} 
        isCheck={isCheck && currentPlayer === cell.figure?.color} 
        selected={!!(selected === cell && selected.figure)} 
        click={() => click(cell)}/>)

        return user?.color === Color.WHITE ? cells : cells.reverse()
    }

    const getBoard = () =>{
        const boardCells = cells.map((row:Cell[],index) =>
            <React.Fragment key={index}>
                {getRow(row)}
            </React.Fragment>)

        return user?.color === Color.WHITE ? boardCells : boardCells.reverse()    
    }
        
    return (
        <>
        <PlayerPanel player={user} opponent={false}/>
        <PlayerPanel player={opponent} opponent={true}/>
        <div className={styles.board}>
            {getBoard()}
        </div>
        {isVictory 
            && 
            <Modal modal={isVictory} title={`${changeColor(currentPlayer)} Player won!`} >
                <Button onClick={() =>navigate(RouteNames.START,{replace:true})} buttonType='primary'>Go to start page</Button>
            </Modal>
        }
        </>       
    );
};

export default BoardComponent;