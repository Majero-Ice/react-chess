import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import BoardModule from './Board/board.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayModule } from './Gateway/gateway.module';


const ENV = process.env.NODE_ENV

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB),
    BoardModule,
    GatewayModule,
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`
    })
    
  ]
  
})
export class AppModule {}
