import {FC} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from '../../shared/';
import styles from './gameModes.module.scss'
import { RouteNames } from '../../app';


export const GameModes:FC = () => {

    const navigate = useNavigate()
    const gameModeHandler = (gameMode:string) =>{
        navigate(RouteNames.LOGIN,{state:gameMode})
    }

    return (
        <div className={styles.gameModes}>
            <div className={styles.container}>
                <h1>Choose the Game mode:</h1>
                <Button buttonType={'primary'} onClick={() => gameModeHandler('online')}>Play online</Button>
                <Button buttonType={'primary'} onClick={() => gameModeHandler('offline')}>Play offline</Button>
            </div>
        </div>
    );
};