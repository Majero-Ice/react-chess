import { Color } from "../../Cell/color"
import { Board } from "../Board"


export interface BoardState{
    id:string,
    currentPlayer:Color,
    gameMode:GameMode,
    board:Board | null
}

export enum GameMode{
    ONLINE = 'online',
    OFFLINE = 'offline'
}