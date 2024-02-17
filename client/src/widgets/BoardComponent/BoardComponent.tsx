import React, {FC,memo,useCallback, useContext, useEffect, useState} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './board.module.scss'
import {PlayerPanel} from '../PlayerPanel/PlayerPanel';
import {Board,Cell,Color,Figure,Player} from "../../entities";
import {CellComponent} from "../../features";
import { SocketContext, RouteNames } from '../../app';
import {Button,Modal,boardUtils,useVictory} from '../../shared';


interface BoardComponentProps{

    gameBoard:Board
    user:Player
    opponent:Player

}


export const BoardComponent:FC<BoardComponentProps> = memo(({gameBoard,user,opponent}) => {

    const socket = useContext(SocketContext)
    const navigate = useNavigate()
    const [board,setBoard] = useState<Board>(gameBoard)
    const [selected,setSelected] = useState<Cell | null>(null)
    const [currentPlayer,setCurrentPlayer] = useState<Color>(localStorage.getItem('currentPlayer') as Color ?? Color.WHITE)
    const {id} = useParams()
    const {state} = useLocation()
    const {isVictory,isCheck} = useVictory(board)

    const onMoveHandler = useCallback(({oldX,oldY,x,y}:any) =>{
        const oldCell = board.getCell(oldX,oldY)
        const newCell = board.getCell(x,y)
        addLostFigure(newCell,false)
        oldCell.moveFigure(newCell)
        setCurrentPlayer(prev => boardUtils.changeColor(prev))
        localStorage.setItem('currentPlayer',boardUtils.changeColor(currentPlayer))
        updateBoard()
    },[board,currentPlayer])
    

    useEffect(() =>{
        if(!state || state.gameMode === 'online' ){
            socket.on('onMove',onMoveHandler)
            localStorage.setItem('gameId',id ?? '')
            return () =>{
                socket.off('onMove',onMoveHandler)    
            }
        }
    },[socket])

    const updateBoard = () =>{
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    useEffect(() =>{
        board.getAvailableMoves(selected ?? null)
        updateBoard()
    },[selected])

    const addLostFigure = (cell:Cell,emit:boolean) =>{
        if(!cell.figure){
            return null
        }   
        let playerId = ''
        if(cell.figure.color !== user?.color){
            user?.lostFigures.push(cell.figure as Figure)
            playerId = user?._id as string
        }else{
            opponent?.lostFigures.push(cell.figure as Figure)
            playerId = opponent?._id as string
        }
        if(emit){
            socket.emit('add-figure',{gameId:id,figureId:cell.figure._id,playerId})
        }
    }



    const click = useCallback((cell:Cell) =>{
        if(selected && cell.available){
            addLostFigure(cell,!state || state.gameMode === 'online')
            socket.emit('move',{id:selected.figure?._id,x:cell.x,y:cell.y})
            selected.moveFigure(cell)
            setCurrentPlayer(prev => boardUtils.changeColor(prev))
            updateBoard()
            setSelected(null)
            localStorage.setItem('currentPlayer',boardUtils.changeColor(currentPlayer))
        }else if(
            ((user?.color === cell.figure?.color && (!state || state.gameMode === 'online') && user?.color === currentPlayer) ||
            (currentPlayer === cell.figure?.color && state.gameMode === 'offline')) 
         ){
            setSelected(cell)
        }
    },[selected,board,currentPlayer])

    const getRow = (row:Cell[]) =>{
        const cells = row.map((cell) =>
        <CellComponent 
        cell={cell}
        key={cell._id} 
        isCheck={isCheck && board.currentPlayer === cell.figure?.color} 
        selected={!!(selected === cell && selected.figure)} 
        click={() => click(cell)}/>)

        return user?.color === Color.WHITE ? cells : cells.reverse()
    }

    const getBoard = () =>{
        const cells = board.cells.map((row:Cell[],index) =>
            <React.Fragment key={index}>
                {getRow(row)}
            </React.Fragment>)

        return user?.color === Color.WHITE ? cells : cells.reverse()    
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
            <Modal modal={isVictory} title={`${boardUtils.changeColor(currentPlayer)} Player won!`} >
                <Button onClick={() =>navigate(RouteNames.START,{replace:true})} buttonType='primary'>Go to start page</Button>
            </Modal>
        }
        </>       
    );
});