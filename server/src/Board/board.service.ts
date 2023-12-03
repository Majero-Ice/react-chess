import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Board, BoardDocument } from "./schemas/board.schema";
import { CellService } from "src/Cell/cell.service";
import { FigureService } from "src/Figure/figure.service";


@Injectable()
export class BoardService{

    constructor(
        @InjectModel(Board.name) private  boardModel:Model<BoardDocument>,
        private cellService:CellService,
        private figureService:FigureService
    ){}

    async create(gameId:string){

        const board = await this.boardModel.findOne({gameId})
        
        if(board){
           return  this.getBoardData(board.id)
        }else{
            const cells = await this.cellService.create()
            const figures = await this.figureService.getFigures()
            const newBoard = await this.boardModel.create({cells,figures,gameId,players:[]})
            return this.getBoardData(newBoard.id)
        }  
    }

    async addPlayers(playersId:ObjectId[],gameId:string){
        const board = await this.boardModel.findOne({gameId})

        if(!board.players.length){
            board.players = playersId
            await board.save()
        }    
    }

    async removeFigure(gameId:string,figureId:string){
        const board = await this.getOne(gameId)
        const figures = board.figures.filter(figure => String(figure) !== figureId)
        board.figures = figures
        await board.save()
    }

    async getOne(gameId:string){
        const board = await this.boardModel.findOne({gameId})

        return board
    }

    async getBoardData(boardId:string){
        const board = await this.boardModel.findById(boardId)
        const {cells} = await board.populate('cells')
        const {figures} = await board.populate('figures')
        return {cells,figures,players:board.players} 
    }

}