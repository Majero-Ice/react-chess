import React, {FC, useEffect, useState} from 'react';
import BoardOnlineComponent from "./BoardOnlineComponent";
import {Board} from "../models/Board";
import Modal from "./UI/Modal/Modal";
import Input from "./UI/Input/Input";
import {useParams} from "react-router-dom";
import PlayerPanelComponent from "./PlayerPanelComponent";
import {Color} from "../models/Color";
import Loader from "./UI/Loader/Loader";
import Button from "./UI/Button/Button";
import cls from "./UI/Button/button.module.css"
import {connection, restartHandler, waitForOpponent} from "../utils";
import '../styles/app.css'
import BoardOfflineComponent from "./BoardOfflineComponent";

const StartComponent:FC = () => {
    const [board,setBoard] = useState(new Board(null,'',null,Date.now()))
    const [modalPlayer,setModalPlayer] =useState<boolean>(false)
    const [playerColor,setPlayerColor] = useState<Color | null>(null)
    const [colorModal,setColorModal] =useState<boolean>(false)
    const [playersCount,setPlayerCount] = useState(0)
    const [playerName,setPlayerName] = useState<string>('')
    const [enemyName,setEnemyName] = useState<string>('')
    const [loader,setLoader] = useState<boolean>(false)
    const [socket,setSocket] = useState<WebSocket | null>(null)
    const [isOnline,setIsOnline] = useState<boolean>(false)
    const [onlineModal,setOnlineModal] = useState<boolean>(true)
    const params = useParams()

    useEffect(() =>{
        if (playerColor){
            restart(playerColor,socket)
        }
    },[playerColor])

    useEffect(() =>{
        if (board.playerColor && isOnline) {
            const socket = new WebSocket('ws://localhost:5000')
            setSocket(socket)
            restart(board.playerColor,socket)

            socket.onopen = () => {
                connection(socket,playerColor,playerName,board,params.id)

                waitForOpponent(socket,params.id,loader,playerName)
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                console.log(msg);
                switch (msg.method){
                    case 'connection':
                        setPlayerCount(msg.playersCount)
                        console.log(`${msg.playerName} is connected`);
                        break
                    case 'waitForOpponent':

                        toggleLoader(msg.loader)
                        break
                    case 'enemyPlayer':
                        setEnemyName(msg.enemy)
                        if(msg.playerId && msg.enemyColor === playerColor){
                            setPlayerColor(playerColor === Color.WHITE ? Color.BLACK : Color.WHITE)
                        }
                        break
                }
            }
        }

    },[board.playerColor])

    const restart = (playerColor:Color,socket:WebSocket | null) =>{
        const newBoard = new Board(socket,params.id ?? '',playerColor,board.playerId,playerColor === Color.BLACK)
        newBoard.createCells()
        newBoard.getFigures()
        setBoard(newBoard)
    }

    const connectionHandler = (playerColor:Color) =>{
        setPlayerColor(playerColor)
        setColorModal(false)
    }

    const toggleLoader = (loader:boolean) =>{
        loader ? setLoader(false) : setLoader(true)
    }
    const closeHandler = () =>{
        if (isOnline){
            setModalPlayer(false)
            setColorModal(true)
        }else {
            setPlayerCount(2)
            setModalPlayer(false)
            setPlayerColor(Color.WHITE)

        }
    }
    return (
        <div className='start__component'>
            <div className='start'>
                {onlineModal
                    ? <Modal modal={onlineModal} title={'Choose the game mode'} closeButton={false}>
                        <Button classes={[cls.primary]} click={() => {
                            setModalPlayer(true)
                            setOnlineModal(false)
                            setIsOnline(true)
                        }}>Online</Button>
                        <Button classes={[cls.primary]} click={() =>{
                            setModalPlayer(true)
                            setOnlineModal(false)
                        }}>Offline</Button>
                      </Modal>
                    : ''
                }
                {modalPlayer
                    ?<Modal modal={modalPlayer} title={'Enter your username'}
                            closeHandler={closeHandler}>

                        <Input value={playerName} setValue={setPlayerName} />
                        {!isOnline ? <Input value={enemyName} setValue={setEnemyName} placeholder='Player 2 name' /> : ''}

                    </Modal>
                    : ''}
                {colorModal && isOnline
                    ? <Modal modal={modalPlayer} closeButton={false} title={'Choose your color'}>
                        <Button classes={[cls.white]} click={() => connectionHandler(Color.WHITE)}>White</Button>
                        <Button classes={[cls.black]} click={() =>connectionHandler(Color.BLACK)}>Black</Button>
                    </Modal>
                    : ''
                }

                {loader && isOnline
                    ? <Loader/>
                    : ''}

                {(!loader && playersCount === 2 && isOnline && enemyName) || (!isOnline && playersCount === 2)
                    ? <React.Fragment>
                        <div className='restart'>
                            <Button click={() => isOnline ? restartHandler(socket,params.id) :document.location.reload()
                            }>Restart</Button>
                        </div>
                        {playerColor
                            ?<PlayerPanelComponent playerName={enemyName ? enemyName : 'Player'}
                                                   lostFigures={playerColor === Color.BLACK
                                                       ? board.lostBlackFigures : board.lostWhiteFigures} enemy={true}/>
                            : ''
                        }

                        {isOnline ?<BoardOnlineComponent board={board} setBoard={setBoard}
                                                         socket={socket} />
                            : <BoardOfflineComponent board={board}  setBoard={setBoard}/>
                        }

                        {playerColor
                            ?<PlayerPanelComponent playerName={playerName ? playerName : 'Player'}
                                                   lostFigures={playerColor === Color.BLACK
                                                       ? board.lostWhiteFigures : board.lostBlackFigures}/>
                            : ''
                        }

                    </React.Fragment>
                    :''
                }
            </div>

        </div>


    );
};

export default StartComponent;