import { createSlice } from "@reduxjs/toolkit";
import { PlayerState } from "./types";


const initialState:PlayerState ={
    user:null,
    opponent:null
}

const playerSlice = createSlice({
    initialState,
    name:'playerSlice',
    reducers:{

    }
})

export const playerSliceActions = playerSlice.actions
export default playerSlice.reducer
