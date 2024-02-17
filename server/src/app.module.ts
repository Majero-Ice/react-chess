import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import BoardModule from './Board/board.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayModule } from './Gateway/gateway.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    BoardModule,
    GatewayModule, 
  ]
})
export class AppModule {}
