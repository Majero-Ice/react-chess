import { Player } from "../Player";


export interface PlayerState{
    user:Player | null
    opponent:Player | null
}