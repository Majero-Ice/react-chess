import { Board } from "../Board"


export interface BoardState{
    id:string,
    gameMode:GameMode,
    board:Board | null,
    loading:boolean
}

export enum GameMode{
    ONLINE = 'online',
    OFFLINE = 'offline'
}