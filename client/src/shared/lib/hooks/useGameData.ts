import { useEffect} from "react"
import { useLocation, useNavigate} from "react-router-dom"
import { useAuth } from "./useAuth"
import { Player } from "../../../entries/Player/Player"
import { RouteNames } from "../../../app/routes/routes"
import { BoardData, createBoard, getFigureClass } from "../board"
import { getBoardData, getPlayerData, getPlayersFormLocalStorage } from "../responses"
import { Board } from "../../../entries/Board/Board"
import { Color } from "../../../entries/Cell/color"
import { useTypedSelector } from "./useTypedSelector"
import { GameMode } from "../../../entries/Board/slice/types"
import { useActions } from "./useActions"


export const useGameData = () =>{

    const {userName,opponentName} = useAuth()
    const {setUser,setOpponent,setLoading,setBoard,joinPlayer} = useActions()
    const {gameMode,board,id} = useTypedSelector(state => state.boardSlice)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() =>{
        if(gameMode === GameMode.OFFLINE){
            setLoading(false)
            setUser(new Player(userName ? userName : 'Player', Color.WHITE,'',[]))
            setOpponent(new Player(opponentName ? opponentName :'Player', Color.BLACK,'',[]))
        }else{
            const {userId,opponentId,gameId} = getPlayersFormLocalStorage()
       if( gameId && gameId === id){
        getPlayerData(userId as string,({_id,color,lostFigures,username}:Player) =>{
            const figures = lostFigures.map(figure => getFigureClass(figure,board as Board))
            const user = new Player(username,color,_id,figures)
            setUser(user)
        },() =>{navigate(RouteNames.LOGIN,{state:{from:location},replace:true}); return null})
        if(opponentId){
            getPlayerData(opponentId,({_id,color,lostFigures,username}:Player) =>{
                const figures = lostFigures.map(figure => getFigureClass(figure,board as Board))
                const opponent = new Player(username,color,_id,figures)
                setOpponent(opponent)
            },() =>{navigate(RouteNames.LOGIN,{state:{from:location},replace:true}); return null})
        }
        getBoardData(id ?? '',(boardData:BoardData) =>{
            const newBoard = createBoard(boardData,id ?? '')
            setBoard(newBoard)
            joinPlayer(userName)
         }) 
       }else if(gameId || !userName){
        navigate(RouteNames.LOGIN,{state:{from:location},replace:true})
    }else{
        getBoardData(id ?? '',(boardData:BoardData) =>{
            const newBoard = createBoard(boardData,id ?? '')
            setBoard(newBoard)
            joinPlayer(userName)
            }) 
    }
        }   
    },[])
}