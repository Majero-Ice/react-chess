import { Module } from "@nestjs/common";
import { Gateway } from "./gateway";
import BoardModule from "src/Board/board.module";


@Module({
    imports:[BoardModule],
    providers:[Gateway]
})
export class GatewayModule {}