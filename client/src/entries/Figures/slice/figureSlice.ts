import { createSlice } from "@reduxjs/toolkit";
import { FigureState } from "./types";

const initialState:FigureState ={
    figures:[]
} 

export const figureSlice = createSlice({
    initialState,
    name:'figure',
    reducers:{

    }
})

export const figureActions = figureSlice.actions
export default figureSlice.reducer