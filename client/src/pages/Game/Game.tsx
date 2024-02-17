import { useContext, useEffect, useState } from 'react';
import styles from './game.module.scss'
import { useLocation,useParams } from 'react-router-dom';
import {Loader,boardUtils,useGameData} from '../../shared';
import { Player } from '../../entities';
import { SocketContext } from '../../app';
import { BoardComponent } from '../../widgets';


export const Game = () => {

    const location = useLocation()
    const socket = useContext(SocketContext)
    const {id} = useParams()
    const [loader,setLoader] = useState(true)
    const [user,setUser] = useState<Player | null>(null)
    const [opponent,setOpponent] = useState<Player | null>(null)
    const [usersAmount,setUsersAmount] = useState(0)
    const board = useGameData(setUser,setOpponent,setLoader)


    useEffect(() =>{
        if(usersAmount === 2 && user && !opponent){
            socket.emit('get-opponent',{gameId:id,userId:user._id})
        }

    },[usersAmount,user,opponent,socket])

    const onJoinHandler = (usersAmount:number) =>{
        setUsersAmount(usersAmount)
        if(opponent && usersAmount === 2){
            setLoader(false)
        }
    }

    const onAddPlayerHandler = ({username,color,_id,lostFigures}:Player) =>{
        const figures = lostFigures.map(figure => boardUtils.getFigureClass(figure,board))
        const user = new Player(username,color,_id,figures)
        localStorage.setItem('userId',user._id)
        setUser(user)
    }
    const onOpponentHandler = ({username,color,_id,lostFigures}:Player) =>{
        const figures = lostFigures.map(figure => boardUtils.getFigureClass(figure,board))
        const opponent = new Player(username,color,_id,figures)
        localStorage.setItem('opponentId',opponent._id)
        setOpponent(opponent)
        setLoader(false)
    }

    useEffect(()=>{
        if(location.state?.gameMode === 'online' || !location.state?.gameMode){
            socket.on('onJoin',onJoinHandler)
            socket.on('onOpponent',onOpponentHandler)
            socket.on('onAddPlayer',onAddPlayerHandler)
            return () =>{
                socket.off('onJoin',onJoinHandler)
                socket.off('onAddPlayer',onAddPlayerHandler)
                socket.off('onOpponent',onOpponentHandler)
            }
        }
    },[socket,user,opponent])


    return (
        <div className={styles.game}>
            <div className={styles.container}>
                {!loader && user && opponent
                ? (<BoardComponent 
                gameBoard={board}
                user={user as Player}
                opponent={opponent as Player}
                />)
                : (<Loader/>)
                }
            </div>        
        </div>
    );
};
