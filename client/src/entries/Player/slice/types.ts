import { Color } from "../../Cell/color";
import { Figure } from "../../Figures/Figure";
import { Player } from "../Player";


export interface PlayerState{
    user:Player | null
    opponent:Player | null
    playersAmount:number,
    currentPlayer:Color
}
export interface addLostFigurePayload{
    isUser:boolean
    figure:Figure
}