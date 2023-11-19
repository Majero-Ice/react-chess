import { Controller, Get, Param } from "@nestjs/common";
import { BoardService } from "./board.service";



@Controller('/boards')
export class BoardController{
    constructor(private boardService:BoardService){}

    @Get('/create/:gameId')
    async create(@Param('gameId') gameId:string){
        return this.boardService.create(gameId)
    }
}