import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FigureState } from "./types";
import { Figure } from "../Figure";

const initialState:FigureState ={
    figures:[]
} 

export const figureSlice = createSlice({
    initialState,
    name:'figure',
    reducers:{
        setFigures(state,action:PayloadAction<Figure[]>){
            state.figures = action.payload
        },
        removeFigure(state,action:PayloadAction<string>){
            state.figures.filter(figure => figure._id !== action.payload)
        }
    }
})

export const figureActions = figureSlice.actions
export default figureSlice.reducer