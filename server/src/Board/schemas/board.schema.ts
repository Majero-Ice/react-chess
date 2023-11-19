import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Player } from "src/Player/schema/player.schema";


export type BoardDocument = HydratedDocument<Board>;

@Schema()
export class Board {
    
    @Prop({type:[{type:mongoose.SchemaTypes.ObjectId,ref:'Player'}]})
    players:ObjectId[] | Player[]
    @Prop({type:[{type:mongoose.SchemaTypes.ObjectId,ref:'Cell'}]})
    cells:ObjectId[]
    @Prop({type:[{type:mongoose.SchemaTypes.ObjectId,ref:'Figure'}]})
    figures:ObjectId[]
    @Prop()
    gameId:string
}

export const BoardSchema = SchemaFactory.createForClass(Board);


