import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player } from "../../Player/Player";
import {SocketState } from "./types";


const initialState:SocketState = {
    user:null,
    opponent:null,
    usersAmount:0
}


export const socketSlice = createSlice({
    name:'socketSlice',
    initialState,
    reducers:{
        setUsersAmount(state,action:PayloadAction<number>){
            state.usersAmount = action.payload
        },
        setUser(state,action:PayloadAction<Player | null>){
            state.user = action.payload
        },
        setOpponent(state,action:PayloadAction<Player | null>){
            state.opponent = action.payload
        }
    }

})

export default socketSlice.reducer
export const SocketActions = socketSlice.actions