import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";



export type FigureDocument = HydratedDocument<Figure>;

@Schema()
export class Figure {
    @Prop()
    color: string;

    @Prop()
    name: string;

    @Prop()
    x:number

    @Prop()
    y:number
}

export const FigureSchema = SchemaFactory.createForClass(Figure);


