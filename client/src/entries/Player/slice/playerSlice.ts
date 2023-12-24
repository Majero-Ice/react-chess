import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerState } from "./types";
import { Player } from "../Player";


const initialState:PlayerState ={
    user:null,
    opponent:null,
    playersAmount:0
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
        joinPlayer(state){
            if(state.playersAmount < 2){
                state.playersAmount++
            }
        }
    }
})

export const playerActions = playerSlice.actions
export default playerSlice.reducer
