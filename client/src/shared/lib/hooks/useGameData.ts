import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./useAuth"
import { Player,Board,Color } from "../../../entities"
import { RouteNames,SocketContext } from "../../../app"
import { BoardData, createBoard, getFigureClass } from "../boardUtils"
import { getBoardData, getPlayerData, getPlayersFormLocalStorage } from "../responses"



export const useGameData = (
    setUser:Dispatch<SetStateAction<Player | null>>,
    setOpponent:Dispatch<SetStateAction<Player | null>>,
    setLoader:Dispatch<SetStateAction<boolean>>
    ) =>{

    const {userName,opponentName} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const {id} = useParams()
    const socket = useContext(SocketContext)
    const [board,setBoard] = useState(new Board(id ?? '',location.state?.gameMode as string))

    useEffect(() =>{
        const gameMode = location.state?.gameMode ? location.state.gameMode : 'online'
        if(gameMode === 'offline'){
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


    return board
}