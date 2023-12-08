import { combineReducers } from "@reduxjs/toolkit";
import boardSlice from "../../entries/Board/slice/boardSlice";
import cellSlice from "../../entries/Cell/slice/cellSlice";
import figureSlice from "../../entries/Figures/slice/figureSlice";
import playerSlice from "../../entries/Player/slice/playerSlice";


export const rootReducer = combineReducers({
    boardSlice,
    cellSlice,
    figureSlice,
    playerSlice
})