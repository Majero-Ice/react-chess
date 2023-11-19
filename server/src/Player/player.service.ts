import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Player, PlayerDocument } from "./schema/player.schema";
import { Model, ObjectId } from "mongoose";
import { BoardService } from "src/Board/board.service";


@Injectable()
export class PlayerService{

    constructor(
        @InjectModel(Player.name) private playerModel:Model<PlayerDocument>,
        private boardService:BoardService
    ){}

    async create(username:string,gameId:string){
        
        const board = await this.boardService.getOne(gameId)

        if(board.players.length === 2){
            return null
        }
        let color = this.randomColor()
        const {players} = await board.populate('players','color')
        if(players.length){
            color = (players[0] as Player).color === 'white' ? 'black' : 'white'
        }
        const player = await this.playerModel.create({username,color,lostFigures:[]})
        board.players.push(player.id)
        await board.save()

        return player
   
    }

    async getPlayer(id:ObjectId){
        const player = (await this.playerModel.findById(id)).populate('lostFigures')

        return player
    }

    async addLostFigure(playerId:ObjectId,figureId:ObjectId){
        const player = await this.playerModel.findById(playerId)
        player.lostFigures.push(figureId)
        await player.save()
    }

    randomColor(){
        const num = Math.floor(Math.random() * 2)
    return num === 0 
    ? 'white'
    : 'black'
    }
}