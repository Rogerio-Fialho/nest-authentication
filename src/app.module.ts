
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URL, { useUnifiedTopology: true }) // configuração para usar o docker
    // MongooseModule.forRoot('mongodb://localhost:27017/auth', { useNewUrlParser: true }) // configuração para usar local
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
