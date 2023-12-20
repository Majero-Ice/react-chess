import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BoardState, GameMode } from "./types";
import { Color } from "../../Cell/color";


const initialState:BoardState ={
    id:'',
    currentPlayer:Color.WHITE,
    gameMode:GameMode.OFFLINE,
}

const boardSlice = createSlice({
    initialState,
    name:'board',
    reducers:{
        create:(() =>{
            
        }),
        setGameMode:((state,action:PayloadAction<GameMode>) =>{
            state.gameMode = action.payload
        })
    }
})

export const boardActions = boardSlice.actions
export default boardSlice.reducer