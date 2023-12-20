import {bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import ActionCreators from "../../../app/store/ActionCreators"


export const useActions = () =>{
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators,dispatch)

}