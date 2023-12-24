import {FC, useEffect} from 'react';
import Button from '../../shared/UI/Button/Button';
import styles from './gameModes.module.scss'
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../app/routes/routes';
import { useActions } from '../../shared/lib/hooks/useActions';
import { GameMode } from '../../entries/Board/slice/types';


const GameModes:FC = () => {

    const navigate = useNavigate()
    const {setGameMode} = useActions()
    const gameModeHandler = (gameMode:GameMode) =>{
        setGameMode(gameMode)
        navigate(RouteNames.LOGIN)
    }

    return (
        <div className={styles.gameModes}>
            <div className={styles.container}>
                <h1>Choose the Game mode:</h1>
                <Button buttonType={'primary'} onClick={() => gameModeHandler(GameMode.ONLINE)}>Play online</Button>
                <Button buttonType={'primary'} onClick={() => gameModeHandler(GameMode.OFFLINE)}>Play offline</Button>
            </div>
        </div>
    );
};

export default GameModes;