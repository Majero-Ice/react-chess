import { Module } from '@nestjs/common';
import BoardModule from './Board/board.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayModule } from './Gateway/gateway.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_ULI),
    BoardModule,
    GatewayModule
    
  ]
  
})
export class AppModule {}
