import { useEffect, useState } from "react"
import { Board } from "../../../entries/Board/Board"


export const useVictory = (board:Board) =>{
    const [isCheck,setIsCheck] = useState<boolean>(false)
    const [isVictory,setIsVictory] = useState<boolean>(false)

    useEffect(() =>{
        if(!board.isKingPossibleMoves(board.getKing(board.currentPlayer)?.figure ?? null) && isCheck){
            setIsVictory(true) 
        }else if(board?.isKingUnderAttack(board.getKing(board.currentPlayer))){    
            setIsCheck(true)
        }else{
            setIsCheck(false)
        }
    },[isCheck,board])

    return {isVictory,isCheck}
}