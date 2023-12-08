import { createSlice } from "@reduxjs/toolkit";
import { CellState } from "./types";


const initialState:CellState ={
    cells:[]
}

const cellSlice = createSlice({
    initialState,
    name:'cellSlice',
    reducers:{}
})

export const cellSliceActions = cellSlice.actions
export default cellSlice.reducer