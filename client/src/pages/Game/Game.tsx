import { useContext, useEffect, useState } from 'react';
import styles from './game.module.scss'
import { useParams } from 'react-router-dom';
import { getFigureClass} from '../../shared/lib/board';
import Loader from '../../shared/UI/Loader/Loader';
import BoardComponent from '../../widgets/BoardComponent/BoardComponent';
import { Player } from '../../entries/Player/Player';
import { SocketContext } from '../../app/context/SocketContext';
import { useGameData } from '../../shared/lib/hooks/useGameData';
import { useTypedSelector } from '../../shared/lib/hooks/useTypedSelector';
import { GameMode } from '../../entries/Board/slice/types';
import { useActions } from '../../shared/lib/hooks/useActions';


const Game = () => {

    const socket = useContext(SocketContext)
    const {id} = useParams()
    const [loader,setLoader] = useState(true)
    const [user,setUser] = useState<Player | null>(null)
    const [opponent,setOpponent] = useState<Player | null>(null)
    const [usersAmount,setUsersAmount] = useState(0)
    const board = useGameData(setUser,setOpponent,setLoader)
    const {gameMode} = useTypedSelector(state => state.boardSlice)
    const {startConnecting} = useActions()


    useEffect(() =>{
        if(usersAmount === 2 && user && !opponent){
            socket.emit('get-opponent',{gameId:id,userId:user._id})
        }

        startConnecting()
    },[usersAmount,user,opponent,socket])

    const onJoinHandler = (usersAmount:number) =>{
        setUsersAmount(usersAmount)
        if(opponent && usersAmount === 2){
            setLoader(false)
        }
    }

    const onAddPlayerHandler = ({username,color,_id,lostFigures}:Player) =>{
        const figures = lostFigures.map(figure => getFigureClass(figure,board))
        const user = new Player(username,color,_id,figures)
        localStorage.setItem('userId',user._id)
        setUser(user)
    }
    const onOpponentHandler = ({username,color,_id,lostFigures}:Player) =>{
        const figures = lostFigures.map(figure => getFigureClass(figure,board))
        const opponent = new Player(username,color,_id,figures)
        localStorage.setItem('opponentId',opponent._id)
        setOpponent(opponent)
        setLoader(false)
    }

    useEffect(()=>{
        if(gameMode === GameMode.ONLINE){
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

export default Game;