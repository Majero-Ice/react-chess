import { InjectModel } from "@nestjs/mongoose";
import { Cell, CellDocument } from "./schema/cell.schema";
import { Model, ObjectId } from "mongoose";


export class CellService{

    constructor(
        @InjectModel(Cell.name) private  cellModel:Model<CellDocument>,
    ){}

    async create(){
        const cells = [] 
        for (let y = 0; y < 8; y++) {
            
            for (let x = 0; x < 8; x++) {
                if((x+y) % 2 === 0 ){
                    const cell = await this.cellModel.create({color:'white',x,y})
                    cells.push(cell.id)
                }else{
                    const cell = await this.cellModel.create({color:'black',x,y})
                    cells.push(cell.id)
                }
            }
        }
        return cells
    }

    async setFigureById(figureId:ObjectId,cellId:ObjectId){
        const cell = await this.cellModel.findById(cellId)
        const figure = await this.cellModel.findById(figureId)

        await cell.save()

        figure.x = cell.x
        figure.y = cell.y
        await figure.save()

        return cell
    }
}