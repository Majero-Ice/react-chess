import { createSlice } from "@reduxjs/toolkit";
import { socketState } from "./types";

const initialState:socketState ={
    isConnected:false,
    isEstablishingConnection:false,
}


const socketSlice = createSlice({
    initialState,
    name:'socket',
    reducers:{
        startConnecting:(state =>{
            state.isEstablishingConnection = true
        }),
        connectionEstablished:(state =>{
            state.isConnected = true
            state.isEstablishingConnection = true
        })
    }
})

export const socketActions = socketSlice.actions
export default socketSlice.reducer