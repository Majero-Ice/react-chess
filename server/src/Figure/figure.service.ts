import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Figure, FigureDocument } from "./schemas/figure.schema";
import { Model } from "mongoose";


@Injectable()
export class FigureService{

    constructor(@InjectModel(Figure.name) private  figureModel:Model<FigureDocument>){}


    async getFigures(){
        return  [
            ...await this.getKings(),
            ...await this.getRooks(),
            ...await this.getKnights(),
            ...await this.getBishops(),
            ...await this.getQueens(),
            ...await this.getPawns()
        ].map(figure => figure.id)   
    }

    async move(id:string,x:number,y:number){
        const figure = await this.figureModel.findById(id)
        const oldX = figure.x
        const oldY = figure.y
        figure.x = x
        figure.y = y
        await figure.save()
        const moveData = {oldX,oldY,x,y,id}

        return moveData
    }



    private async getKings(){
        return [
            await this.figureModel.create({name:'King',color:'black',x:4,y:0}),
            await this.figureModel.create({name:'King',color:'white',x:4,y:7})
        ]

        
        
    }

    private async getRooks(){
        return [
            await this.figureModel.create({name:'Rook',color:'black',x:0,y:0}),
            await this.figureModel.create({name:'Rook',color:'black',x:7,y:0}),
            await this.figureModel.create({name:'Rook',color:'white',x:0,y:7}),
            await this.figureModel.create({name:'Rook',color:'white',x:7,y:7})
        ]   
    }
    private async getBishops(){
        return [
            await this.figureModel.create({name:'Bishop',color:'black',x:2,y:0}),
            await this.figureModel.create({name:'Bishop',color:'black',x:5,y:0}),
            await this.figureModel.create({name:'Bishop',color:'white',x:2,y:7}),
            await this.figureModel.create({name:'Bishop',color:'white',x:5,y:7})
        ]   
    }

    private async getQueens(){
        return [
            await this.figureModel.create({name:'Queen',color:'black',x:3,y:0}),
            await this.figureModel.create({name:'Queen',color:'white',x:3,y:7})
        ]   
    }

    private async getKnights(){
        return [
            await this.figureModel.create({name:'Knight',color:'black',x:1,y:0}),
            await this.figureModel.create({name:'Knight',color:'black',x:6,y:0}),
            await this.figureModel.create({name:'Knight',color:'white',x:1,y:7}),
            await this.figureModel.create({name:'Knight',color:'white',x:6,y:7})
        ]   
    }

    private async getPawns(){

        const pawns = []

        for(let x = 0; x < 8;x++){
            pawns.push(await this.figureModel.create({name:'Pawn',color:'black',x,y:1}))
            pawns.push(await this.figureModel.create({name:'Pawn',color:'white',x,y:6}))
        }
        return pawns
    }



    

}