import {useLocation, useNavigate } from "react-router-dom";
import { FC } from "react";
import {Button, Input,useAuth,useInput} from "../../shared";
import styles from './playerForm.module.scss'
import { RouteNames } from "../../app";


interface PlayerFormProps{
    gameMode:'offline' | 'online'
}

export const PlayerForm:FC<PlayerFormProps> = ({gameMode = 'offline'}) => {

    const username = useInput('')
    const opponentName = useInput('')
    const {getUser,getOpponent} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const gameId =`/b${(+new Date()).toString(16)}`
    const toBoard =() =>{
        const name = username.value ? username.value : 'Player'
        getOpponent(opponentName.value,() =>{})
        getUser(name,() =>navigate(RouteNames.GAME + gameId,{replace:true,state:{gameMode}}))
        localStorage.clear()
        if(location.state.from){
            navigate(location.state.from.pathname,{replace:true})
        }
          
    }
    return (
        <div className={styles.playerForm}>
            <form>
                <label htmlFor="playerName">Player Name</label>
                <Input value={username.value} name={'playerName'} changeHandler={username.changeHandler}/>
                {gameMode === 'offline' 
                    ? <>
                    <label htmlFor="opponentName">Player 2 Name</label>
                    <Input value={opponentName.value} name={'opponentName'} changeHandler={opponentName.changeHandler}/>
                    </> 
                    :''}
                <Button buttonType='primary' onClick={toBoard}>Let's play!</Button>
            </form>               
        </div>
    );
};