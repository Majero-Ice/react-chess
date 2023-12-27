import React, {useCallback,useEffect, useState} from 'react';
import styles from './board.module.scss'
import {Board} from "../../entries/Board/Board";
import CellComponent from "../../features/Cell/CellComponent";
import { Cell } from '../../entries/Cell/Cell';
import { Color } from '../../entries/Cell/color';
import PlayerPanel from '../PlayerPanel/PlayerPanel';
import { changeColor } from '../../shared/lib/board';
import Modal from '../../shared/UI/Modal/Modal';
import Button from '../../shared/UI/Button/Button';
import { useNavigate} from 'react-router-dom';
import { RouteNames } from '../../app/routes/routes';
import { useVictory } from '../../shared/lib/hooks/useVictory';
import { useTypedSelector } from '../../shared/lib/hooks/useTypedSelector';
import { GameMode } from '../../entries/Board/slice/types';
import { useActions } from '../../shared/lib/hooks/useActions';
import { Figure } from '../../entries/Figures/Figure';

const BoardComponent = () => {

    const navigate = useNavigate()
    const {board,id,gameMode} = useTypedSelector(state =>state.boardSlice)
    const {user,opponent,currentPlayer} = useTypedSelector(state => state.playerSlice)
    const {cells} = useTypedSelector(state => state.cellSlice)
    const {figures} = useTypedSelector(state => state.figureSlice)
    const [selected,setSelected] = useState<Cell | null>(null)
    const {isVictory,isCheck} = useVictory(board as Board)
    const {removeFigure,moveFigure} = useActions()


    useEffect(() =>{
        board?.getAvailableMoves(selected ?? null)
    },[selected])

    const getPlayerId = (figure:Figure) =>{
        if(user && opponent){
            return user?.color === figure.color ? user?._id : opponent?._id
        }
    }

    const getFigure =(x:number,y:number) =>{
        return figures.find(figure => figure.x === x && figure.y === y) ?? null
    } 
    
    const click = useCallback((cell:Cell) =>{
            const figure = figures.find(figure => figure.x === cell.x && figure.y === cell.y)
        if(selected && cell.available){
            if(figure){
                removeFigure({
                    figureId:figure._id,
                    gameId:id,
                    playerId:getPlayerId(figure) ?? ''
                })
            }
            moveFigure({id:selected.figure?._id ?? '',x:cell.x,y:cell.y})
            setSelected(null)
            localStorage.setItem('currentPlayer',changeColor(currentPlayer))
        }else if(
            ((user?.color === figure?.color && (gameMode === GameMode.ONLINE) && user?.color === currentPlayer) ||
            (currentPlayer === figure?.color && gameMode === GameMode.OFFLINE)) 
         ){
            setSelected(cell)
        }
    },[selected,board,currentPlayer])

    const getRow = (row:Cell[]) =>{
        const cells = row.map((cell) =>
        <CellComponent 
        cell={cell}
        figure={getFigure(cell.x,cell.y)}
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