import {FC} from 'react';
import Button from '../../shared/UI/Button/Button';
import styles from './gameModes.module.scss'
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../app/routes/routes';


const GameModes:FC = () => {

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

export default GameModes;