import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BoardState, GameMode } from "./types";
import { Board } from "../Board";


const initialState:BoardState ={
    id:'',
    gameMode:GameMode.OFFLINE,
    board:null,
    loading:false
}

export const boardSlice = createSlice({
    initialState,
    name:'board',
    reducers:{
        setBoard(state,action:PayloadAction<Board>){
            state.board = action.payload
        },
        setGameMode(state,action:PayloadAction<GameMode>){
            state.gameMode = action.payload
        },
        setLoading(state,action:PayloadAction<boolean>){
            state.loading = action.payload
        },
        setBoardId(state,action:PayloadAction<string>){
            state.id = action.payload
        }
    }
})
export default boardSlice.reducer
export const boardActions = boardSlice.actions
