import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/auth', { useNewUrlParser: true })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
