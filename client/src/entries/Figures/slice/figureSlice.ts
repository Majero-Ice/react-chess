import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FigureState, MoveFigurePayload, RemoveFigurePayload } from "./types";
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
        removeFigure(state,action:PayloadAction<RemoveFigurePayload>){
            const {figureId} = action.payload
            state.figures.filter(figure => figure._id !== figureId)
        },
        moveFigure(state,action:PayloadAction<MoveFigurePayload>){
            const {id,x,y} = action.payload
            state.figures.forEach((figure) =>{
                if(figure._id !== id){
                    return
                }
                figure.x = x
                figure.y = y
            })            
        }
    }
})

export const figureActions = figureSlice.actions
export default figureSlice.reducer