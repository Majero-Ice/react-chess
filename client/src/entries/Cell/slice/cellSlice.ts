import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CellState } from "./types";
import { Cell } from "../Cell";


const initialState:CellState ={
    cells:[],
    selected:null
}

const cellSlice = createSlice({
    initialState,
    name:'cell',
    reducers:{
        setCells(state,action:PayloadAction<Cell[][]>){
            state.cells = action.payload
        },
        setSelected(state, action:PayloadAction<Cell | null>){
            state.selected = action.payload
        }
    }
})

export const cellActions = cellSlice.actions
export default cellSlice.reducer
