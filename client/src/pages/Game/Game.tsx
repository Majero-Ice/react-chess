import { useContext, useEffect, useState } from 'react';
import styles from './game.module.scss'
import { useAuth } from '../../shared/lib/hooks/useAuth';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BoardData, changeColor, createBoard, getFigureClass, randomColor } from '../../shared/lib/board';
import { Board } from '../../entries/Board/Board';
import Loader from '../../shared/UI/Loader/Loader';
import BoardComponent from '../../widgets/BoardComponent/BoardComponent';
import { Player } from '../../entries/Player/Player';
import { SocketContext } from '../../app/context/SocketContext';
import { RouteNames } from '../../app/routes/routes';
import { getBoardData, getPlayerData, getPlayersFormLocalStorage } from '../../shared/lib/responses';
import { Color } from '../../entries/Cell/color';


const Game = () => {

    const {userName,opponentName} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const socket = useContext(SocketContext)
    const {id} = useParams()
    const [board,setBoard] = useState(new Board(id ?? '',location.state.gameMode))
    const [loader,setLoader] = useState(true)
    const [user,setUser] = useState<Player | null>(null)
    const [opponent,setOpponent] = useState<Player | null>(null)
    const [usersAmount,setUsersAmount] = useState(0)
    

    useEffect(() =>{

        if(location.state.gameMode === 'offline'){
            setLoader(false)
            setUser(new Player(userName ? userName : 'Player', Color.WHITE,'',[]))
            setOpponent(new Player(opponentName ? opponentName :'Player', Color.BLACK,'',[]))
            socket.disconnect()
        }else{
            const {userId,opponentId,gameId} = getPlayersFormLocalStorage()
       if( gameId && gameId === id){
        getPlayerData(userId as string,({_id,color,lostFigures,username}:Player) =>{
            const figures = lostFigures.map(figure => getFigureClass(figure,board))
            const user = new Player(username,color,_id,figures)
            setUser(user)
        },() =>{navigate(RouteNames.LOGIN,{state:{from:location},replace:true}); return null})
        if(opponentId){
            getPlayerData(opponentId,({_id,color,lostFigures,username}:Player) =>{
                const figures = lostFigures.map(figure => getFigureClass(figure,board))
                const opponent = new Player(username,color,_id,figures)
                setOpponent(opponent)
            },() =>{navigate(RouteNames.LOGIN,{state:{from:location},replace:true}); return null})
        }
        getBoardData(id ?? '',(boardData:BoardData) =>{
            const newBoard = createBoard(boardData,id ?? '')
            setBoard(newBoard)
            socket.emit('join-player',{gameId:id,username:userName})
         }) 
       }else if(gameId || !userName){
        navigate(RouteNames.LOGIN,{state:{from:location},replace:true})
    }else{
        getBoardData(id ?? '',(boardData:BoardData) =>{
            const newBoard = createBoard(boardData,id ?? '')
            setBoard(newBoard)
            socket.emit('join-player',{gameId:id,username:userName})
         }) 
    }
        }
        
    },[])
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
        if(location.state.gameMode === 'online'){
            socket.on('onJoin',onJoinHandler)
            socket.on('onOpponent',onOpponentHandler)
            socket.on('onAddPlayer',onAddPlayerHandler)
            return () =>{
                socket.off('onJoin',onJoinHandler)
                socket.off('onAddPlayer',onAddPlayerHandler)
                socket.off('onOpponent',onOpponentHandler)
            }
        }
    },[socket,user])


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