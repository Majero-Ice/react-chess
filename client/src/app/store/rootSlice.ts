import { combineReducers } from "@reduxjs/toolkit";
import socketSlice from "../../entries/Socket/model/socketSlice";



export const rootReducer = combineReducers({
    socketSlice

})