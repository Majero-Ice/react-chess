import { Controller, Get, Param } from "@nestjs/common";
import { PlayerService } from "./player.service";
import { ObjectId } from "mongoose";



@Controller('/players')
export class PlayerController{
    constructor(private playerService:PlayerService){}

    @Get('/:playerId')
    async create(@Param('playerId') playerId:ObjectId){
        return this.playerService.getPlayer(playerId)
    }
}