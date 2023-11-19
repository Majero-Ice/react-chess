import { Module } from "@nestjs/common";
import { BoardController } from "./board.controller";
import { BoardService } from "./board.service";
import { CellService } from "src/Cell/cell.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Board, BoardSchema } from "./schemas/board.schema";
import { Cell, CellSchema } from "src/Cell/schema/cell.schema";
import { FigureService } from "src/Figure/figure.service";
import { Figure, FigureSchema } from "src/Figure/schemas/figure.schema";
import { PLayerSchema, Player } from "src/Player/schema/player.schema";
import { PlayerService } from "src/Player/player.service";
import { PlayerController } from "src/Player/player.controller";


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:Board.name,schema:BoardSchema},
            {name:Cell.name,schema:CellSchema},
            {name:Figure.name,schema:FigureSchema},
            {name:Player.name,schema:PLayerSchema}
        ])
    ],
    controllers:[BoardController,PlayerController],
    providers:[BoardService,CellService,FigureService,PlayerService],
    exports:[BoardService,FigureService,PlayerService]
})



export default class BoardModule {}