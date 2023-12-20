import { createSlice } from "@reduxjs/toolkit";
import { PlayerState } from "./types";


const initialState:PlayerState ={
    user:null,
    opponent:null
}

const playerSlice = createSlice({
    initialState,
    name:'player',
    reducers:{

    }
})

export const playerActions = playerSlice.actions
export default playerSlice.reducer
