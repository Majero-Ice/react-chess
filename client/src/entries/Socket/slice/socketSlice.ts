import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { socketState } from "./types";

const initialState:socketState ={
    isConnected:false,
    isEstablishingConnection:false,
    socket:null
}


const socketSlice = createSlice({
    initialState,
    name:'socket',
    reducers:{
        setSocket:((state,action:PayloadAction<Socket>) =>{
           // state.socket = action.payload: WritableDraft<Socket<DefaultEventsMap, DefaultEventsMap>>
        }),
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