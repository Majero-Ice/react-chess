import { Color } from "../Cell/color"
import { Figure } from "../Figures/Figure"


export class Player{
    username:string
    color:Color
    lostFigures:Figure[]
    _id:string
    constructor(username:string,color:Color,_id:string,lostFigures:Figure[]){
        this.username = username
        this.color = color
        this._id = _id.length ? _id : String(Date.now)
        this.lostFigures = lostFigures
        
    }

    getCopyPlayer(){
        const newPlayer = new Player(this.username,this.color,this._id,this.lostFigures)
        return newPlayer   
    }
}