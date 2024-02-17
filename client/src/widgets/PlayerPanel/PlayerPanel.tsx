import { FC } from "react";
import styles from "./playerPanel.module.scss"
import { Color, Player,FigureNames } from "../../entities/";
import { boardUtils, figureImages } from "../../shared";



interface PlayerPanelProps{
    player:Player | null
    opponent:boolean
}



export const PlayerPanel:FC<PlayerPanelProps> = ({player,opponent}) => {

    

    const getFigures = (name:string) => {
        const color =  boardUtils.changeColor(player?.color as Color)
        const figures = player?.lostFigures.filter(f => f.name === name)
        const figureImg = figureImages[(color + name) as keyof typeof figureImages]

        return (
            <div className={!figures?.length ? styles.empty : ''}>
                <img src={figureImg} alt={name} className={styles.figureImg}/>
                &#10008;<span>{figures?.length}</span>
            </div>
        )
        
        

    }


    return (
        <>
        {player 
        && <div className={opponent ? styles.opponent : styles.user}>
        <div className={styles.playerName}>{player.username}</div>
        <div className={styles.playerFigures}>
            <div className={styles.playerFigure}>{getFigures(FigureNames.PAWN)}</div>
            <div className={styles.playerFigure}>{getFigures(FigureNames.QUEEN)}</div>
            <div className={styles.playerFigure}>{getFigures(FigureNames.KNIGHT)}</div>
            <div className={styles.playerFigure}>{getFigures(FigureNames.ROOK)}</div>
            <div className={styles.playerFigure}>{getFigures(FigureNames.BISHOP)}</div>
        </div>
    </div>
        }
        </>
    );
};