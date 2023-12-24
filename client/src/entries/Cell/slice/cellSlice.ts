import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CellState } from "./types";
import { Cell } from "../Cell";


const initialState:CellState ={
    cells:[]
}

const cellSlice = createSlice({
    initialState,
    name:'cell',
    reducers:{
        setCells(state,action:PayloadAction<Cell[][]>){
            state.cells = action.payload
        }
    }
})

export const cellActions = cellSlice.actions
export default cellSlice.reducer
