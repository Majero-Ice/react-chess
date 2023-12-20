import { FC } from "react";
import PlayerForm from "../../widgets/PlayerForm/PlayerForm";
import styles from './login.module.scss'

const Login:FC = () => {

    return (
        <>
            <h1 className={styles.heading}>Enter the Player name:</h1>
            <PlayerForm/>
        </>
    );
};

export default Login;