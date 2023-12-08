import { Color } from "../../Cell/color"


export interface BoardState{
    id:string,
    currentPlayer:Color,
    gameMode:'online' | 'offline'


}