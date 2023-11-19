import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";



export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {
    
    @Prop()
    username:string;

    @Prop()
    color:string
    @Prop()
    gameId:string

    @Prop({type:[{type:mongoose.SchemaTypes.ObjectId,ref:'Figure'}]})
    lostFigures:ObjectId[]

}

export const PLayerSchema = SchemaFactory.createForClass(Player);


