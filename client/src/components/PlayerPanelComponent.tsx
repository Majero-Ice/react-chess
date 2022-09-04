import React, {FC} from 'react';
import {Figure} from "../models/Figures/Figure";
import '../styles/playerPanel.css'
import '../styles/playerFigures.css'
import {FigureName} from "../models/FigureName";

interface PlayerPanelProps {
    playerName:string
    lostFigures:Figure[]
    enemy?:boolean
}

const PlayerPanelComponent:FC<PlayerPanelProps> = ({playerName,lostFigures,enemy}) => {

    const getFigures = (name:string) => {
        return  lostFigures
            .filter(f => f.name === name)
            .map((figure,index) =>
                <img src={figure.logo} alt="" key={figure.id}
                     style={{transform:`translate(calc(-28px * ${index}))`,zIndex:-index}}/>)

    }


    return (
        <div className={enemy ? 'enemy' : 'player__panel'}>
            <div className="player__name">{playerName}</div>
            <div className="player__figures">
                <div className="pawn">{getFigures(FigureName.PAWN)}</div>
                <div className="queen">{getFigures(FigureName.QUEEN)}</div>
                <div className="knight">{getFigures(FigureName.KNIGHT)}</div>
                <div className="rook">{getFigures(FigureName.ROOK)}</div>
                <div className="bishop">{getFigures(FigureName.BISHOP)}</div>
            </div>
        </div>
    );
};

export default PlayerPanelComponent;