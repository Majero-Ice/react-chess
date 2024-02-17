import { FC } from "react";
import {PlayerForm} from "../../widgets";
import { useLocation } from "react-router-dom";
import styles from './login.module.scss'

export const Login:FC = () => {

    const {state} = useLocation()

    return (
        <>
            <h1 className={styles.heading}>Enter the Player name:</h1>
            <PlayerForm gameMode={state}/>
        </>
    );
};