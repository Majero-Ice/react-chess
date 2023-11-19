import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";



export type CellDocument = HydratedDocument<Cell>;

@Schema()
export class Cell {
    @Prop()
    x:number

    @Prop()
    y:number

    @Prop()
    color: string;
}

export const CellSchema = SchemaFactory.createForClass(Cell);


