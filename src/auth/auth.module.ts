import { Module, HttpModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SamlStrategy } from './strategies/saml.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    SamlStrategy,
  ],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }]),
    JwtModule.register({
      secret: 'TopMingleSecret',
      signOptions: {
        expiresIn: 3600
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    HttpModule
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
