import { Module } from '@nestjs/common';
import BoardModule from './Board/board.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayModule } from './Gateway/gateway.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.idcdkc5.mongodb.net/?retryWrites=true&w=majority'),
    BoardModule,
    GatewayModule
    
  ]
  
})
export class AppModule {}
