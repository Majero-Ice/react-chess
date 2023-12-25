import { Figure } from "../Figure";


export interface FigureState{
    figures:Figure[]
}

export interface MoveFigurePayload{
    id:string
    x:number
    y:number
}
export interface RemoveFigurePayload{
    gameId:string
    figureId:string
    playerId:string
}