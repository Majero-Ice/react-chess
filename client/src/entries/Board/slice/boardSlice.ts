import { createSlice } from "@reduxjs/toolkit";
import { BoardState } from "./types";
import { Color } from "../../Cell/color";


const initialState:BoardState ={
    id:'',
    currentPlayer:Color.WHITE,
    gameMode:'offline'
}

const boardSlice = createSlice({
    initialState,
    name:'boardSlice',
    reducers:{

    }
})

export const boardSliceActions = boardSlice.actions
export default boardSlice.reducer