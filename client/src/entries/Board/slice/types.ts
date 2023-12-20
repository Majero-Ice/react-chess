import { Color } from "../../Cell/color"


export interface BoardState{
    id:string,
    currentPlayer:Color,
    gameMode:GameMode,
}

export enum GameMode{
    ONLINE = 'online',
    OFFLINE = 'offline'
}