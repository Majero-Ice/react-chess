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

export const cellActions = cellSlice.actions
export default cellSlice.reducer
