import { useContext, useEffect} from 'react';
import styles from './game.module.scss'
import { getFigureClass} from '../../shared/lib/board';
import Loader from '../../shared/UI/Loader/Loader';
import BoardComponent from '../../widgets/BoardComponent/BoardComponent';
import { Player } from '../../entries/Player/Player';
import { SocketContext } from '../../app/context/SocketContext';
import { useGameData } from '../../shared/lib/hooks/useGameData';
import { useTypedSelector } from '../../shared/lib/hooks/useTypedSelector';
import { GameMode } from '../../entries/Board/slice/types';
import { useActions } from '../../shared/lib/hooks/useActions';
import { Board } from '../../entries/Board/Board';


const Game = () => {

    const {gameMode,loading,board} = useTypedSelector(state => state.boardSlice)
    const {user,opponent} = useTypedSelector(state => state.playerSlice)
    const {startConnecting} = useActions()

    useGameData()

    useEffect(()=>{
        if(gameMode === GameMode.ONLINE){
            startConnecting()
        }
    },[])


    return (
        <div className={styles.game}>
            <div className={styles.container}>
                {!loading && user && opponent
                ? (<BoardComponent />)
                : (<Loader/>)
                }
            </div>        
        </div>
    );
};

export default Game;