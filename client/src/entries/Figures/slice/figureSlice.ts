import { createSlice } from "@reduxjs/toolkit";
import { FigureState } from "./types";

const initialState:FigureState ={
    figures:[]
} 

export const figureSlice = createSlice({
    initialState,
    name:'figureState',
    reducers:{

    }
})

export const figureSliceActions = figureSlice.actions
export default figureSlice.reducer