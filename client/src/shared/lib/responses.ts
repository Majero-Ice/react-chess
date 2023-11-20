import axios from "axios"
import { Player } from "../../entries/Player/Player"

export const getPlayersFormLocalStorage = () =>{
    const userId = localStorage.getItem('userId')
    const opponentId = localStorage.getItem('opponentId')
    const gameId = localStorage.getItem('gameId')
    
    return {
        userId,
        opponentId,
        gameId  
        }
}

export const getBoardData = async (id:string,cb:any,) =>{
    
    const res = await axios.get(`http://localhost:5000/boards/create/${id}`)
    if(res.data){
        const boardData = res.data
        cb(boardData)   
        
    }
}

export const getPlayerData = async (playerId:string,cb:any,onError:any) =>{
    if(!playerId){
        return null
    }
    const res = await axios.get(`http://localhost:5000/players/${playerId}`)
        if(res.data){
            const playerData:Player = res.data
            console.log(playerData)
            if(playerData){
                cb(playerData)
            }
        }else{
            console.log(res)
            onError()  
        }
}