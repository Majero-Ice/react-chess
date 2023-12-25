import { Board } from "../Board"


export interface BoardState{
    id:string,
    gameMode:GameMode,
    board:Board | null
}

export enum GameMode{
    ONLINE = 'online',
    OFFLINE = 'offline'
}