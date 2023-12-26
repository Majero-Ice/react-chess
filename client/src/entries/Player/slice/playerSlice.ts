import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerState, addLostFigurePayload } from "./types";
import { Player } from "../Player";
import { Color } from "../../Cell/color";


const initialState:PlayerState ={
    user:null,
    opponent:null,
    playersAmount:0,
    currentPlayer:Color.WHITE
}

const playerSlice = createSlice({
    initialState,
    name:'player',
    reducers:{
        setUser(state,action:PayloadAction<Player>){
            state.user = action.payload
        },
        setOpponent(state,action:PayloadAction<Player>){
            state.opponent = action.payload
        },
        joinPlayer(state,payload:PayloadAction<string>){
            if(state.playersAmount < 2){
                state.playersAmount++
            }
        },
        addLostFigure(state,action:PayloadAction<addLostFigurePayload>){
            action.payload.isUser 
            ? state.user?.lostFigures.push(action.payload.figure) 
            : state.opponent?.lostFigures.push(action.payload.figure)
        },
        setCurrentPlayer(state,action:PayloadAction<Color>){
            state.currentPlayer = action.payload
        }
    }
})

export const playerActions = playerSlice.actions
export default playerSlice.reducer
